import { useStoryblok, StoryblokComponent } from '@storyblok/react'
import { sbVersion } from '../storyblok'

// The homepage now renders whatever sections live in the Storyblok "home"
// story. The section markup itself lives in src/blocks/.
export default function Home() {
  const story = useStoryblok('home', { version: sbVersion() })

  if (!story?.content) return <div className="sb-loading" aria-hidden="true" />

  return <StoryblokComponent blok={story.content} />
}
