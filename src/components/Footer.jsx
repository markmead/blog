export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="max-w-prose mx-auto">
        <div className="border-4 p-4 border-black text-center">
          <p className="text-xs">{year} Mark Mead.</p>
        </div>
      </div>
    </footer>
  )
}
