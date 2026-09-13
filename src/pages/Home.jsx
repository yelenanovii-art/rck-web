import { useStoryblok, StoryblokComponent } from '@storyblok/react'
import { sbVersion, inVisualEditor } from '../storyblok'
import prebuilt from '../content/home.json'

// The homepage sections live in the Storyblok "home" story; the markup for each
// is in src/blocks/.
//
// Content is baked in at build time (scripts/fetch-storyblok.mjs writes
// home.json) rather than fetched from the browser, so no Storyblok token ships
// to visitors. Inside the Visual Editor we still hit the API live, otherwise
// editors could not see their changes — that path only runs in dev or in the
// editor's iframe, where the token is present by design.
export default function Home() {
  const live = useStoryblok(inVisualEditor() ? 'home' : '', { version: sbVersion() })
  const content = (inVisualEditor() && live?.content) || prebuilt

  if (!content) return <div className="sb-loading" aria-hidden="true" />

  return <StoryblokComponent blok={content} />
}
