export default function Footer() {
  return (
    <footer className="gap-4 p-4 bg-slate-50 rounded-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 text-center">
      <p className="text-sm text-slate-500 dark:text-gray-400">
        {new Date().getFullYear()} Mark Mead.
      </p>
    </footer>
  )
}
