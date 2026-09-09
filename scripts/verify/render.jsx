// Renders the old hardcoded homepage and the new Storyblok-driven one to
// static HTML so they can be diffed. Verification only, not shipped.
import { renderToStaticMarkup } from 'react-dom/server'
import { storyblokInit, apiPlugin, StoryblokComponent } from '@storyblok/react'
import { storyblokComponents } from '../../src/blocks'
import HomeLegacy from './HomeLegacy.jsx'

export async function render(token) {
  storyblokInit({
    accessToken: token,
    use: [apiPlugin],
    components: storyblokComponents,
    apiOptions: { region: 'eu' },
    bridge: false,
  })

  const res = await fetch(`https://api.storyblok.com/v2/cdn/stories/home?version=draft&token=${token}`)
  const { story } = await res.json()

  return {
    legacy: renderToStaticMarkup(<HomeLegacy />),
    next: renderToStaticMarkup(<StoryblokComponent blok={story.content} />),
  }
}
