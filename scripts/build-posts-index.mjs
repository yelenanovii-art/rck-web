// Emits src/content/posts-index.json — the frontmatter of every post, without
// the bodies. The app imports this small file eagerly for /insights, routing
// and related-post lists, so only the article page pays for the prose.
//
// Runs before vite in both `npm run dev` and `npm run build`.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIR = 'src/content/posts'
const OUT = 'src/content/posts-index.json'

const scalar = (raw, key) => {
  const m = new RegExp(`^${key}:\\s*(.*)$`, 'm').exec(raw)
  if (!m) return ''
  const v = m[1].trim()
  try {
    return v.startsWith('"') ? JSON.parse(v) : v
  } catch {
    return v.replace(/^"|"$/g, '')
  }
}

const posts = readdirSync(DIR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const raw = readFileSync(join(DIR, f), 'utf8')
    const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
    const slug = scalar(raw, 'slug') || f.replace(/\.md$/, '')
    return {
      slug,
      href: `/post/${slug}`,
      title: scalar(raw, 'title') || slug,
      date: scalar(raw, 'date'),
      description: scalar(raw, 'description'),
      author: scalar(raw, 'author'),
      hero: scalar(raw, 'hero'),
      // Computed here so the index page never needs the body.
      readingTime: Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 225)),
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

writeFileSync(OUT, JSON.stringify(posts, null, 2) + '\n')
console.log(`posts-index: ${posts.length} post(s) -> ${OUT}`)
