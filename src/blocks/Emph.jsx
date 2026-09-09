// Lets a plain Storyblok text field carry inline bold, written as **like this**.
// Keeps single-field editing simple while preserving emphasis the design relies on.
// `tag` picks the element, so each spot keeps the exact markup it had before.
export default function Emph({ text = '', tag: Tag = 'strong' }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <Tag key={i}>{part.slice(2, -2)}</Tag>
        ) : (
          part
        )
      )}
    </>
  )
}
