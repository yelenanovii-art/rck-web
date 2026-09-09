import { storyblokInit, apiPlugin } from '@storyblok/react'
import { storyblokComponents } from './blocks'

// One-time SDK setup. Imported from main.jsx before the app renders.
storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: storyblokComponents,
  apiOptions: { region: 'eu' },
})

// Draft content in dev and inside the Visual Editor iframe, published content
// everywhere else. Without this, a live visitor would see unpublished edits.
export function sbVersion() {
  if (import.meta.env.DEV) return 'draft'
  if (typeof window !== 'undefined' && window.location.search.includes('_storyblok')) return 'draft'
  return 'published'
}
