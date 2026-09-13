// Blog posts, split so the main bundle carries only what the listing needs.
//
// posts-index.json holds every post's frontmatter (generated before each build
// by scripts/build-posts-index.mjs) and is imported eagerly — /insights,
// routing and related-post lists all work from it. The Markdown bodies and the
// renderer load on demand, so a visitor who never opens an article never
// downloads 14k words of prose or the parser.
//
// Slugs match the URLs the posts had on the old Wix site (/post/<slug>), so the
// domain cutover preserves their search equity without redirects.
import index from '../content/posts-index.json'

// Not eager: each file becomes its own chunk, fetched only when a post renders.
const bodies = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default' })

export const POSTS = index

const BY_SLUG = new Map(POSTS.map((p) => [p.slug, p]))

export function getPost(slug) {
  return BY_SLUG.get(slug) || null
}

// "/post/my-slug" -> the post's metadata, or null (App falls back to 404).
export function postFromPath(path) {
  const m = /^\/post\/([^/]+)\/?$/.exec(path || '')
  return m ? getPost(m[1]) : null
}

function pathFor(slug) {
  return Object.keys(bodies).find((p) => p.endsWith(`/${slug}.md`)) || null
}

// Resolves to the post's rendered HTML. Loads marked alongside the body so the
// parser stays out of the main bundle too.
export async function loadPostHtml(post) {
  const file = pathFor(post.slug)
  if (!file) return ''
  const [raw, { marked }] = await Promise.all([bodies[file](), import('marked')])
  marked.setOptions({ mangle: false, headerIds: false })

  let body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
  // The migrated posts open with the same image the frontmatter names as the
  // hero, which the article template already renders above the body.
  if (post.hero) {
    const esc = post.hero.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    body = body.replace(new RegExp(`^\\s*!\\[[^\\]]*\\]\\(${esc}\\)\\s*`), '')
  }
  return marked.parse(body)
}

export function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00Z')
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
