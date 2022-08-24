export default function Footer() {
  let footerItems = [
    { title: 'HyperUI', path: 'https://www.hyperui.dev/' },
    { title: 'HyperJS', path: 'https://js.hyperui.dev/' },
    {
      title: 'Hypercolor',
      path: 'https://www.hypercolor.dev/',
    },
  ]

  return (
    <footer class="relative">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            {new Date().getFullYear()} Mark Mead.
          </p>

          <ul className="flex gap-4 text-xs">
            {footerItems.map((footerItem) => (
              <li key={footerItem.path}>
                <a
                  href="https://www.hyperui.dev/"
                  target="_blank"
                  rel="nofollow noreferrer"
                  className="text-slate-700 hover:text-slate-600"
                >
                  <span className="text-xs">{footerItem.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
