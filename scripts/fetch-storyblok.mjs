// Pulls the published Storyblok "home" story into src/content/home.json before
// each build, so the deployed site renders it from a baked-in file instead of
// calling the API from the browser.
//
// Why: any VITE_-prefixed variable is compiled into the public bundle, so the
// old client-side fetch shipped the Storyblok token to every visitor. That
// token reads DRAFT content — unpublished edits were readable by anyone who
// opened the JS. The token this script uses is STORYBLOK_TOKEN (no VITE_
// prefix), which stays server-side on the build machine.
//
// The Visual Editor still talks to the API live; see src/pages/Home.jsx.
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs'

const OUT = 'src/content/home.json'

// Vite reads .env.local, plain node does not — so load it here for local runs.
// On Netlify the value comes from the site's environment instead.
function fromEnvFile(key) {
  try {
    const line = readFileSync('.env.local', 'utf8')
      .split('\n')
      .find((l) => l.startsWith(`${key}=`))
    return line ? line.slice(key.length + 1).trim().replace(/^["']|["']$/g, '') : ''
  } catch {
    return ''
  }
}

const token =
  process.env.STORYBLOK_TOKEN ||
  fromEnvFile('STORYBLOK_TOKEN') ||
  fromEnvFile('VITE_STORYBLOK_TOKEN')

async function main() {
  if (!token) {
    // On CI this must not pass silently: a missing story means a blank homepage.
    const msg = 'fetch-storyblok: STORYBLOK_TOKEN is not set.'
    if (process.env.NETLIFY) {
      console.error(`${msg} Refusing to build a homepage with no content.`)
      process.exit(1)
    }
    console.warn(`⚠ ${msg} Keeping the existing ${OUT} if present.`)
    if (!existsSync(OUT)) writeFileSync(OUT, 'null\n')
    return
  }

  const url = `https://api.storyblok.com/v2/cdn/stories/home?version=published&token=${token}&cv=${Date.now()}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Storyblok returned ${res.status}`)
  const { story } = await res.json()
  if (!story?.content) throw new Error('Storyblok returned no story content')

  mkdirSync('src/content', { recursive: true })
  writeFileSync(OUT, JSON.stringify(story.content, null, 2) + '\n')
  console.log(`fetch-storyblok: "${story.name}" (published ${story.published_at?.slice(0, 10)}) -> ${OUT}`)
}

main().catch((err) => {
  console.error('fetch-storyblok:', err.message)
  // A build that ships an empty homepage is worse than a build that stops.
  process.exit(1)
})
