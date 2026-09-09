import { StoryblokComponent } from '@storyblok/react'

// The page container: renders whatever sections the editor has arranged.
// Deliberately a fragment, so the DOM is identical to the hand-written pages
// and no wrapper element can affect layout. Each section carries its own
// Visual Editor binding.
export default function Page({ blok }) {
  return (
    <>
      {(blok.body || []).map((section) => (
        <StoryblokComponent blok={section} key={section._uid} />
      ))}
    </>
  )
}
