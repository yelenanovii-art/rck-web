import { storyblokInit, apiPlugin } from '@storyblok/react'
import { storyblokComponents } from './blocks'

// One-time SDK setup. Imported from main.jsx before the app renders.
storyblokInit({
  // Only ever hand the SDK a token in dev. Vite substitutes import.meta.env
  // values at build time, so referencing the variable unconditionally bakes the
  // token into the public bundle — where it can be read by anyone and used to
  // fetch DRAFT content. Guarding on DEV lets the production branch be dropped
  // entirely, so no token exists to leak, whatever the build environment holds.
  //
  // Deployed pages do not need it: they render the build-time copy of the story
  // (see scripts/fetch-storyblok.mjs and src/pages/Home.jsx).
  accessToken: import.meta.env.DEV ? import.meta.env.VITE_STORYBLOK_TOKEN : '',
  use: [apiPlugin],
  components: storyblokComponents,
  apiOptions: { region: 'eu' },
})

// True only where a live Storyblok fetch is wanted: local dev, or the Visual
// Editor's iframe. Deployed pages render the build-time copy instead, so no
// token is needed — and none is shipped.
export function inVisualEditor() {
  if (import.meta.env.DEV) return true
  return typeof window !== 'undefined' && window.location.search.includes('_storyblok')
}

// Draft content in dev and inside the Visual Editor iframe, published content
// everywhere else. Without this, a live visitor would see unpublished edits.
export function sbVersion() {
  return inVisualEditor() ? 'draft' : 'published'
}
