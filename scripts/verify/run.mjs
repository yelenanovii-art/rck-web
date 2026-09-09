import { writeFileSync } from 'node:fs'

const { render } = await import(process.env.SSR_BUNDLE)
const { legacy, next } = await render(process.env.SB_TOKEN)

// Normalise what is expected to differ: Storyblok's editable attributes and
// React's generated ids (useId output differs run to run).
const clean = (html) =>
  html
    .replace(/ data-blok-c="[^"]*"/g, '')
    .replace(/ data-blok-uid="[^"]*"/g, '')
    .replace(/(id|aria-controls|aria-labelledby|for)="[^"]*[:«»][^"]*"/g, '$1="X"')
    .replace(/\s+/g, ' ')
    .trim()

// The page block wraps everything in one extra <div>. Strip it for the diff.
const strip = (h) => (h.startsWith('<div>') && h.endsWith('</div>') ? h.slice(5, -6) : h)

// Known intentional fixes, normalised away so they do not mask real diffs.
// Each one is a typo in the original copy that was corrected during migration.
const FIXES = [
  [/ ,/g, ','], // "the 40/60 model , senior operators" -> "model, senior"
]
const fixup = (h) => FIXES.reduce((acc, [re, to]) => acc.replace(re, to), h)

const a = fixup(clean(legacy))
const b = fixup(strip(clean(next)))

writeFileSync(process.env.HOME + '/legacy.html', a)
writeFileSync(process.env.HOME + '/next.html', b)

console.log('legacy length:', a.length)
console.log('next   length:', b.length)
console.log('IDENTICAL:', a === b)

if (a !== b) {
  let i = 0
  while (i < a.length && i < b.length && a[i] === b[i]) i++
  console.log('\nfirst difference at char', i, 'of', a.length)
  console.log('\nOLD: ...' + a.slice(Math.max(0, i - 100), i + 200))
  console.log('\nNEW: ...' + b.slice(Math.max(0, i - 100), i + 200))
}
