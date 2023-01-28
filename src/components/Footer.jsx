export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <p className="text-xs">{year} Mark Mead.</p>
    </footer>
  )
}
