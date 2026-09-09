# Photos

Drop real image files in this folder, then point each `<Photo>` at them with
`src="/photos/<filename>"`. Until you do, each slot shows an on-brand placeholder
that names the photo it's waiting for.

Recommended: web-optimised **.webp** or **.jpg**, ~1600–2400px on the long edge,
compressed. Keep everything muted, desaturated and navy-toned — editorial, not
stock-glossy. Avoid literal handshake / lightbulb / generic "business" stock.

## The four slots and what to shoot

| Where | Component call | Suggested shot | Good ratio |
|-------|----------------|----------------|-----------|
| **Home** — image band | `pages/Home.jsx` | Wide, understated cityscape of the London or Barcelona financial district at dusk, or a quiet well-lit boardroom. Cinematic, desaturated. | 21:9 |
| **Deal Advisory** — "Who you work with" | `pages/Advisory.jsx` | Portrait of a senior partner/operator, or a candid meeting-room working shot. Real people, natural light. Ideally your actual managing partners. | 4:5 |
| **TRANSFORM+** — product preview | `pages/Platform.jsx` | A clean screenshot of the TRANSFORM+ UI (OKR cascade, a stage-gate, the Value Signal dashboard, or the Seal audit trail). Dark UI; optionally in a subtle laptop/browser frame. | 16:9 |
| **Contact** — office | `pages/Contact.jsx` | The London or Barcelona office: reception, a warm meeting room, or an architectural detail of the building. | 4:3 |

## Example

```jsx
// Before (placeholder):
<Photo className="reveal photo--wide" tone="dark" suggest="…" />

// After (real image):
<Photo className="reveal photo--wide" src="/photos/london-dusk.webp" alt="London at dusk" />
```

`tone="dark"` and the `photo--wide` / `photo--band` classes only style the
placeholder + framing; keep them when you add `src` so the corners/ratio stay consistent.
