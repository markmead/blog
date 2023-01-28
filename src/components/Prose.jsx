export default function Prose({ children }) {
  return (
    <article className="prose-lg prose max-w-none prose-headings:text-black">
      {children}
    </article>
  )
}
