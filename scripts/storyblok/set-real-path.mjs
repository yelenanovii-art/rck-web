// Storyblok appends a story's slug to the preview URL. The homepage lives at
// "/" rather than "/home", so the Home story needs an explicit real path.
// Usage: node scripts/storyblok/set-real-path.mjs <slug> <real-path>
import { api } from './sb.mjs'

const slug = process.argv[2] || 'home'
const realPath = process.argv[3] ?? '/'

const { stories } = await api('GET', `/stories?with_slug=${slug}`)
if (!stories.length) throw new Error(`No story with slug "${slug}"`)
const { id } = stories[0]

await api('PUT', `/stories/${id}`, { story: { path: realPath }, publish: 1 })

const { story } = await api('GET', `/stories/${id}`)
console.log(`${story.slug} -> real path: ${story.path || '(none)'}`)
