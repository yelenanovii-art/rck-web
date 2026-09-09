import { storyblokEditable } from '@storyblok/react'
import SectionHead from '../components/SectionHead'
import Photo from '../components/Photo'

export default function ImageBand({ blok }) {
  const src = blok.image?.filename || undefined
  return (
    <section className="section" {...storyblokEditable(blok)}>
      <div className="container">
        <SectionHead center eyebrow={blok.eyebrow} title={blok.title} />
        <Photo
          className="reveal photo--wide"
          tone={blok.tone || 'dark'}
          src={src}
          alt={blok.image?.alt || ''}
          suggest={blok.suggest}
        />
      </div>
    </section>
  )
}
