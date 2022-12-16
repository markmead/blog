export default function Prose({ children }) {
  return (
    <article className="prose-sm prose max-w-none prose-headings:text-black">
      {children}
    </article>
  )
}
