# Wix → Netlify blog migration (one-off)

Scripts used to move the 12 blog posts off the old Wix site at www.rckpm.es
into `src/content/posts/`. Kept for reference and in case more posts are
published on Wix before the domain cutover.

Run order:

```bash
python3 scripts/migration/wix-export.py       # scrape posts -> Markdown
python3 scripts/migration/localise-images.py  # download images, strip author bio
```

Notes on the source:

- There is no usable RSS feed — `blog-feed.xml` returns a Wix 404 page with
  HTTP 200 — so the exporter reads the rendered HTML instead.
- Metadata comes from the JSON-LD `BlogPosting` block, except the title:
  Wix truncates `headline` at ~110 characters, so `og:title` is used.
- Body content is taken from the `data-hook="post"` container, stopping at
  `data-hook="post-footer"` to avoid related-posts and share widgets.
- Wix serves a blurred low-quality placeholder at the `/v1/<transform>/` path;
  stripping that gives the original, and re-adding a `fit` transform keeps the
  download to a sensible size (~8x smaller than the raw original).
- Slugs are preserved exactly (`/post/<slug>`) so the cutover keeps the search
  equity of these URLs without redirects.
