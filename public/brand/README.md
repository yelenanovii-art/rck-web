# RCK logo files

The nav (and any <Logo>) loads these two files. Until they exist, the site shows
a clean text fallback (navy "RC" + copper "K"), so nothing breaks.

Drop your exact logo here with these names:

- rck-logo.svg        — full colour (navy letters + copper ribbon), for LIGHT backgrounds
- rck-logo-white.svg  — reversed (white letters + copper ribbon), for DARK backgrounds
                        (used in the transparent nav over the hero, and the footer)

SVG is best (crisp at any size). Transparent PNG also works — if you only have PNG,
rename to rck-logo.png / rck-logo-white.png and tell me, and I'll point the code at .png.

Recommended: transparent background, trimmed tight to the wordmark, ~40px tall render.
After adding files, run `npm run build`.
