// Post-build prerender: render each route in headless Chrome and write static
// HTML (with its baked-in <title>, meta, canonical and content) to
// dist/<route>/index.html. Gives crawlers and AI answer engines real per-page
// HTML without executing JS. The SPA still hydrates on load.
//
// Usage: node scripts/prerender.mjs   (run after `vite build`)
// Chrome path can be overridden with CHROME_BIN.
import { execFileSync, spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const ROUTES = [
  '/', '/advisory', '/products/transform-plus', '/diagnostics/value-at-risk', '/diagnostics/readiness-score', '/diagnostics/deal-value-modeller', '/contact',
  '/about/team', '/about/partner-led-model', '/about/outcomes-vs-advisory',
  '/about/founder-built-playbooks', '/services/transformation-outcomes',
  '/services/interim-management', '/services/integrated-interim',
  '/resources/playbooks', '/case-studies', '/the-outcome-circle',
  '/services/deal-advisory-carve-outs', '/services/value-creation-cost-transformation',
  '/services/restructuring-turnaround', '/services/erp-enterprise-applications',
  '/services/erp/application-si-selection', '/services/erp/programme-assurance', '/services/erp/implementation',
  '/insights', '/about/our-firm', '/privacy', '/legal', '/terms', '/cookies',
]

// Blog posts live in src/content/posts/*.md and are added to the route list
// from disk, so publishing a post through /admin needs no edit here. Slug comes
// from frontmatter when present, otherwise the filename.
const POSTS_DIR = 'src/content/posts'
function readPosts() {
  if (!existsSync(POSTS_DIR)) return []
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = readFileSync(join(POSTS_DIR, f), 'utf8')
      const slug = (/^slug:\s*(.+)$/m.exec(raw)?.[1] || f.replace(/\.md$/, '')).trim()
      const date = (/^date:\s*(.+)$/m.exec(raw)?.[1] || '').trim()
      return { slug, date }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}
const POSTS = readPosts()
ROUTES.push(...POSTS.map((p) => `/post/${p.slug}`))
console.log(`prerender: ${POSTS.length} blog post(s) discovered`)

// Guard against accidental empty slots (e.g. a stray trailing comma above).
if (ROUTES.some((r) => typeof r !== 'string' || !r)) {
  console.error('prerender: ROUTES contains an empty entry — check for stray commas.')
  process.exit(1)
}

const PORT = 4183
const DIST = 'dist'

// Locate a Chrome/Chromium binary; skip prerender gracefully if none is found
// (so a CI/host build without Chrome still succeeds as a plain SPA build).
function findChrome() {
  const candidates = [
    process.env.CHROME_BIN,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean)
  for (const c of candidates) {
    try {
      if (existsSync(c)) return c
    } catch {}
  }
  return null
}
const CHROME = findChrome()

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `vite build` first.')
  process.exit(1)
}
// The static sitemap in public/ carries hand-tuned priorities for the fixed
// pages; posts are appended here rather than regenerating and losing those.
const SITEMAP = join(DIST, 'sitemap.xml')
if (POSTS.length && existsSync(SITEMAP)) {
  const xml = readFileSync(SITEMAP, 'utf8')
  const origin = (/<loc>(https?:\/\/[^/]+)/.exec(xml)?.[1] || '').replace(/\/$/, '')
  const entries = POSTS.filter((p) => !xml.includes(`<loc>${origin}/post/${p.slug}</loc>`))
    .map((p) => `  <url><loc>${origin}/post/${p.slug}</loc><lastmod>${p.date}</lastmod><changefreq>yearly</changefreq><priority>0.6</priority></url>`)
    .join('\n')
  if (entries) {
    writeFileSync(SITEMAP, xml.replace('</urlset>', entries + '\n</urlset>'))
    console.log(`prerender: added ${POSTS.length} post URL(s) to sitemap.xml`)
  }
}

if (!CHROME) {
  console.warn('⚠ Chrome not found — skipping prerender (SPA build). Set CHROME_BIN to enable per-page static HTML.')
  process.exit(0)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function waitForServer(url, tries = 40) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return true
    } catch {}
    await sleep(250)
  }
  return false
}

const server = spawn(
  'npx',
  ['vite', 'preview', '--port', String(PORT), '--strictPort'],
  { stdio: 'ignore' }
)

try {
  const up = await waitForServer(`http://localhost:${PORT}/`)
  if (!up) throw new Error('preview server did not start')

  let n = 0
  for (const route of ROUTES) {
    const html = execFileSync(
      CHROME,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--virtual-time-budget=6000',
        '--run-all-compositor-stages-before-draw',
        '--dump-dom',
        `http://localhost:${PORT}${route}`,
      ],
      { encoding: 'utf8', maxBuffer: 1024 * 1024 * 128 }
    )
    const outDir = route === '/' ? DIST : join(DIST, route)
    mkdirSync(outDir, { recursive: true })
    const doc = html.trimStart().toLowerCase().startsWith('<!doctype')
      ? html
      : '<!doctype html>\n' + html
    writeFileSync(join(outDir, 'index.html'), doc)
    n++
    console.log(`prerendered ${route}`)
  }
  console.log(`\n✓ prerendered ${n} routes into dist/`)
} finally {
  server.kill()
}
