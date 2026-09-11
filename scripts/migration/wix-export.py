"""Extract RCK blog posts from the live Wix site into Markdown + frontmatter."""
import re, json, os, sys, html as H, urllib.request, urllib.error

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'posts')
os.makedirs(OUT, exist_ok=True)
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36'}

def fetch(url, tries=3):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            return urllib.request.urlopen(req, timeout=45).read().decode('utf-8', 'replace')
        except Exception as e:
            if i == tries - 1:
                raise
    return ''

def inline_md(frag):
    """Convert inline HTML to Markdown, preserving links and emphasis."""
    frag = re.sub(r'<a\b[^>]*href="([^"]+)"[^>]*>(.*?)</a>',
                  lambda m: '[%s](%s)' % (re.sub(r'<[^>]+>', '', m.group(2)).strip(), m.group(1)), frag, flags=re.S)
    frag = re.sub(r'<(strong|b)\b[^>]*>(.*?)</\1>', lambda m: '**%s**' % re.sub(r'<[^>]+>', '', m.group(2)).strip(), frag, flags=re.S)
    frag = re.sub(r'<(em|i)\b[^>]*>(.*?)</\1>', lambda m: '*%s*' % re.sub(r'<[^>]+>', '', m.group(2)).strip(), frag, flags=re.S)
    frag = re.sub(r'<br\s*/?>', '\n', frag)
    txt = H.unescape(re.sub(r'<[^>]+>', '', frag))
    return re.sub(r'[ \t ]+', ' ', txt).strip()

def orig_image(url):
    """Strip Wix's /v1/<transform>/ segment to get the full-resolution asset."""
    return re.sub(r'/v1/.*$', '', url)

def clean_desc(text, limit=300):
    """Wix's JSON-LD description runs straight into the body, often mid-word.
    Trim to the last sentence that fits."""
    t = ' '.join(H.unescape(text or '').split())
    if len(t) <= limit:
        return t
    cut = t[:limit]
    end = max(cut.rfind('. '), cut.rfind('! '), cut.rfind('? '))
    return (cut[:end + 1] if end > 60 else cut.rsplit(' ', 1)[0] + '…').strip()

AUTHORS = {'shauntaylor1': 'Shaun Taylor'}

def display_author(name):
    return AUTHORS.get(name, name)

def jsonld(doc):
    for m in re.finditer(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', doc, re.S):
        try:
            d = json.loads(m.group(1))
        except Exception:
            continue
        for it in (d if isinstance(d, list) else [d]):
            if it.get('@type') == 'BlogPosting':
                return it
    return {}

def og(doc, prop):
    m = re.search(r'property="og:%s" content="([^"]*)"' % prop, doc)
    return H.unescape(m.group(1)).strip() if m else ''

def extract(url):
    doc = fetch(url)
    meta = jsonld(doc)
    s, e = doc.find('data-hook="post"'), doc.find('data-hook="post-footer"')
    if s < 0 or e < 0 or e <= s:
        return None, 'content container not found'
    region = doc[s:e]

    # Content images live in figure-IMAGE blocks; everything else is UI chrome
    # (share icons, avatars, related-post thumbs). Wix serves a blurred LQIP at
    # the /v1/<transform>/ path, so strip it back to the original asset.
    figures = {}
    for fm in re.finditer(r'data-hook="figure-IMAGE".*?<img\b[^>]*?src="([^"]+)"', region, re.S):
        figures[fm.start()] = orig_image(fm.group(1))

    body, seen_h1 = [], False
    pattern = r'<(h[1-6]|p|li|blockquote)\b[^>]*>(.*?)</\1>|data-hook="figure-IMAGE"'
    for m in re.finditer(pattern, region, re.S):
        tag, inner = m.group(1), m.group(2)
        if tag is None:
            img_url = figures.get(m.start())
            if img_url:
                body.append(('img', img_url))
            continue
        txt = inline_md(inner)
        if not txt:
            continue
        if tag == 'h1':
            if not seen_h1:      # the H1 is the title; keep it in frontmatter only
                seen_h1 = True
                continue
            tag = 'h2'
        body.append((tag, txt))

    # Drop a trailing author-bio paragraph block if present
    while body and body[-1][0] == 'p' and re.match(r'^(Shaun|About the author)', body[-1][1]):
        body.pop()

    lines, imgs = [], []
    for tag, txt in body:
        if tag == 'img':
            imgs.append(txt); lines.append('![](%s)' % txt)
        elif tag.startswith('h'):
            lines.append('%s %s' % ('#' * int(tag[1]), txt))
        elif tag == 'li':
            lines.append('- %s' % txt)
        elif tag == 'blockquote':
            lines.append('> %s' % txt)
        else:
            lines.append(txt)
    return {
        'url': url,
        'slug': url.rstrip('/').split('/')[-1],
        'title': og(doc, 'title') or H.unescape(meta.get('headline') or ''),
        'date': (meta.get('datePublished') or '')[:10],
        'description': clean_desc(meta.get('description')),
        'hero': orig_image((meta.get('image') or {}).get('url', '')) if isinstance(meta.get('image'), dict) else '',
        'author': display_author((meta.get('author') or {}).get('name', '')) if isinstance(meta.get('author'), dict) else '',
        'body': '\n\n'.join(lines),
        'images': imgs,
    }, None

def main():
    sm = fetch('https://www.rckpm.es/blog-posts-sitemap.xml')
    urls = re.findall(r'<loc>([^<]+)</loc>', sm)
    print('found %d post URLs\n' % len(urls))
    ok = fail = 0
    for i, u in enumerate(urls, 1):
        try:
            post, err = extract(u)
        except Exception as ex:
            post, err = None, str(ex)
        if not post:
            print('%2d. FAIL %s -> %s' % (i, u.split('/')[-1][:50], err)); fail += 1; continue
        fm = ['---',
              'title: %s' % json.dumps(post['title'], ensure_ascii=False),
              'date: %s' % post['date'],
              'slug: %s' % post['slug'],
              'description: %s' % json.dumps(post['description'], ensure_ascii=False),
              'author: %s' % json.dumps(post['author'], ensure_ascii=False),
              'hero: %s' % json.dumps(post['hero'], ensure_ascii=False),
              'source: %s' % post['url'],
              '---', '']
        open(os.path.join(OUT, post['slug'] + '.md'), 'w', encoding='utf-8').write('\n'.join(fm) + post['body'] + '\n')
        words = len(post['body'].split())
        print('%2d. OK   %-46s %4d words, %d imgs, %s' % (i, post['slug'][:46], words, len(post['images']), post['date']))
        ok += 1
    print('\nextracted %d, failed %d -> %s' % (ok, fail, OUT))

main()
