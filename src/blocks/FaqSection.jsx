import { storyblokEditable } from '@storyblok/react'
import Faq from '../components/Faq'

// Faq owns the accordion markup and the FAQPage structured data; this block
// only maps Storyblok fields onto its props. The editable binding is passed
// through to Faq's own <section>, so no wrapper element is introduced.
export default function FaqSection({ blok }) {
  const items = (blok.items || []).map((i) => ({ q: i.question, a: i.answer }))
  return (
    <Faq
      id={blok.anchor || 'faq'}
      eyebrow={blok.eyebrow}
      title={blok.title}
      items={items}
      {...storyblokEditable(blok)}
    />
  )
}
