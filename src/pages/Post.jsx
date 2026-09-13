import { useEffect, useState } from 'react'
import CTABand from '../components/CTABand'
import { ArrowRight } from '../components/Icons'
import { POSTS, formatDate, loadPostHtml } from '../lib/posts'

// A single blog post (/post/<slug>). Body HTML comes from the Markdown in
// src/content/posts/, rendered at build time in src/lib/posts.js — the content
// is ours and authored through /admin, so injecting it is safe here.
//
// The author bio used to be duplicated at the foot of all 12 posts; it now
// lives in <AuthorCard> so there is one copy to keep current.
export default function Post({ post }) {
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)
  // The body lives in its own chunk so the rest of the site doesn't carry it.
  // The prerender's headless Chrome resolves this before it dumps the DOM, so
  // the static HTML still ships the full article.
  const [html, setHtml] = useState('')
  useEffect(() => {
    let live = true
    loadPostHtml(post).then((h) => { if (live) setHtml(h) })
    return () => { live = false }
  }, [post])

  return (
    <>
      <section className="hero hero--sub hero--article">
        <div className="container hero__inner">
          <p className="eyebrow eyebrow--light">
            <a href="/insights" className="post-back">Insights</a>
          </p>
          <h1 className="hero__title">{post.title}</h1>
          {/* No standfirst here: the migrated descriptions are lifted from each
              post's opening paragraph, so showing one would repeat the first
              line of the body. It still drives <meta description>, og:title
              and the card on /insights. */}
          <div className="hero__meta">
            {[post.author, formatDate(post.date), `${post.readingTime} min read`]
              .filter(Boolean)
              .join('  ·  ')}
          </div>
        </div>
      </section>

      {post.hero && (
        <section className="section post-hero-wrap">
          <div className="container">
            <img className="post-hero" src={post.hero} alt="" loading="eager" />
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <article className="prose post-body" dangerouslySetInnerHTML={{ __html: html }} />
          <AuthorCard name={post.author} />
        </div>
      </section>

      {more.length > 0 && (
        <section className="section section--paper">
          <div className="container">
            <h2 className="section-head__title">More insights</h2>
            <div className="related-grid" style={{ marginTop: 22 }}>
              {more.map((p, i) => (
                <a
                  className="related-card reveal"
                  style={{ '--delay': `${(i % 3) * 70}ms` }}
                  href={p.href}
                  key={p.slug}
                >
                  <span className="related-card__tag">{formatDate(p.date)}</span>
                  <h4>{p.title}</h4>
                  <span className="related-card__go">Read <ArrowRight /></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        eyebrow="Talk to a partner"
        title="Where is value leaking in your business?"
        copy="A partner will respond within one business day to arrange a strategy call."
      />
    </>
  )
}

function AuthorCard({ name }) {
  if (!name) return null
  return (
    <aside className="post-author">
      <h3>About {name}</h3>
      <p>
        Shaun is a seasoned C-level transformation executive with a proven track record in{' '}
        <strong>strategic growth, operational optimisation, and value creation</strong>, specialising
        in helping C-suite leaders navigate complex transitions. His expertise lies in large-scale
        and private-equity-backed businesses, where he has delivered complex transformation and
        operational successes with measurable outcomes.
      </p>
      <p>
        Through <strong>RCK Programme Methods</strong>, he brings a structured approach blending
        agile principles with deep operational insight to align{' '}
        <strong>technology, operations, and strategy</strong> for sustainable success.
      </p>
      <a className="btn btn-navy" href="/about/team">
        Meet the partners <ArrowRight />
      </a>
    </aside>
  )
}
