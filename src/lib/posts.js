// Blog posts, loaded from src/content/posts/*.md at build time.
//
// Each file carries YAML-ish frontmatter (title, date, slug, description,
// author, hero, source) followed by Markdown. Posts are edited at /admin via
// Decap CMS, which commits them straight back to this folder — so there is no
// runtime CMS call and no API token to keep alive, and the prerender step can
// enumerate them straight off disk.
//
// Slugs match the URLs the posts had on the old Wix site (/post/<slug>), so
// the domain cutover preserves their search equity without redirects.
import { marked } from 'marked'

const files = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// Minimal frontmatter reader: the fields we write are scalars, quoted with
// JSON rules when they contain punctuation. Avoids pulling in a YAML parser.
function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!m) return { data: {}, body: raw }
  const data = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line)
    if (!kv) continue
    const value = kv[2].trim()
    try {
      data[kv[1]] = value.startsWith('"') ? JSON.parse(value) : value
    } catch {
      data[kv[1]] = value.replace(/^"|"$/g, '')
    }
  }
  return { data, body: m[2] }
}

marked.setOptions({ mangle: false, headerIds: false })

function build(path, raw) {
  const { data, body: rawBody } = parseFrontmatter(raw)
  const slug = data.slug || path.split('/').pop().replace(/\.md$/, '')

  // The migrated posts open with the same image the frontmatter names as the
  // hero, which the article template already renders above the body. Drop it
  // so it isn't shown twice.
  const body = data.hero
    ? rawBody.replace(new RegExp(`^\\s*!\\[[^\\]]*\\]\\(${data.hero.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)\\s*`), '')
    : rawBody
  const words = body.split(/\s+/).filter(Boolean).length
  return {
    slug,
    href: `/post/${slug}`,
    title: data.title || slug,
    date: data.date || '',
    description: data.description || '',
    author: data.author || '',
    hero: data.hero || '',
    html: marked.parse(body),
    // ~225 wpm is the usual reading-speed estimate for prose.
    readingTime: Math.max(1, Math.round(words / 225)),
  }
}

// Newest first — the order the /insights index and "more posts" lists use.
export const POSTS = Object.entries(files)
  .map(([path, raw]) => build(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

const BY_SLUG = new Map(POSTS.map((p) => [p.slug, p]))

export function getPost(slug) {
  return BY_SLUG.get(slug) || null
}

// "/post/my-slug" -> the post, or null for anything else (App falls back to 404).
export function postFromPath(path) {
  const m = /^\/post\/([^/]+)\/?$/.exec(path || '')
  return m ? getPost(m[1]) : null
}

export function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00Z')
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
