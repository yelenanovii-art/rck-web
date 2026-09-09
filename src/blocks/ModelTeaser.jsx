import { storyblokEditable } from '@storyblok/react'
import SectionHead from '../components/SectionHead'
import FeeBar from '../components/FeeBar'
import { ArrowRight } from '../components/Icons'

export default function ModelTeaser({ blok }) {
  return (
    <section
      className="section"
      style={{ background: 'linear-gradient(180deg,#fbfaf7 0%,#f2f0ea 100%)', borderBlock: '1px solid var(--line)' }}
      {...storyblokEditable(blok)}
    >
      <div className="container">
        <div className="model-split">
          <div>
            <SectionHead eyebrow={blok.eyebrow} title={blok.title} lede={blok.lede} />
            <a className="link-arrow reveal" href={blok.link_url} style={{ marginTop: '8px' }}>
              {blok.link_label} <ArrowRight />
            </a>
          </div>
          <div className="model-panel reveal">
            <FeeBar />
          </div>
        </div>
      </div>
    </section>
  )
}
