"""Strip the repeated author bio and pull every post image into public/blog/."""
import os, re, io, glob, urllib.request, hashlib

ROOT = '/Users/elenanovikova/Websites/rck-web'
POSTS = os.path.join(ROOT, 'src/content/posts')
IMGDIR = os.path.join(ROOT, 'public/blog')
os.makedirs(IMGDIR, exist_ok=True)
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36'}

# Wix serves the raw original (multi-MB); a fit transform is ~8x smaller at
# the same visual quality for web use.
def sized(url, w=1600):
    name = url.rsplit('/', 1)[-1]
    return '%s/v1/fit/w_%d,h_%d,q_85/%s' % (url, w, w, name)

cache = {}
def localise(url):
    if url in cache:
        return cache[url]
    name = url.rsplit('/', 1)[-1]                      # 356a23_<hash>~mv2.jpeg
    ext = os.path.splitext(name)[1] or '.jpg'
    safe = re.sub(r'[^a-zA-Z0-9]', '', name.split('~')[0])[-24:] + ext
    dest = os.path.join(IMGDIR, safe)
    if not os.path.exists(dest):
        data = urllib.request.urlopen(urllib.request.Request(sized(url), headers=UA), timeout=60).read()
        open(dest, 'wb').write(data)
        print('   downloaded %-34s %6.0f KB' % (safe, len(data) / 1024))
    cache[url] = '/blog/' + safe
    return cache[url]

# "About Shaun Taylor" closes every post — a heading in some, a bare line in
# others. It is identical boilerplate, so it belongs in the article template.
BIO = re.compile(r'\n(?:#{1,6}\s*)?About Shaun Taylor\s*\n.*$', re.S)

total_removed = 0
for path in sorted(glob.glob(os.path.join(POSTS, '*.md'))):
    src = io.open(path, encoding='utf-8').read()
    print(os.path.basename(path)[:60])

    before = len(src.split())
    src, n = BIO.subn('\n', src)
    if n:
        total_removed += 1

    for url in sorted(set(re.findall(r'https://static\.wixstatic\.com/media/[^\s")\]]+', src))):
        src = src.replace(url, localise(url))

    io.open(path, 'w', encoding='utf-8').write(src.rstrip() + '\n')
    print('   bio %s | %d -> %d words' % ('removed' if n else 'NOT FOUND', before, len(src.split())))

print('\nbio stripped from %d/12 posts; %d images in public/blog/' % (total_removed, len(os.listdir(IMGDIR))))
