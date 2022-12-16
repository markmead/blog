import { useRouter } from 'next/router'

import Link from 'next/link'

export default function Header() {
  const nextRouter = useRouter()

  const menuItems = [
    { title: 'Blog', path: '/blog', external: false },
    { title: 'Projects', path: '/projects', external: false },
    {
      title: 'Twitter',
      path: 'https://twitter.com/itsmarkmead',
      external: true,
    },
    {
      title: 'GitHub',
      path: 'https://github.com/markmead',
      external: true,
    },
  ]

  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-white">
      <div className="flex items-center justify-between py-4">
        <Link href="/">
          <a
            aria-current={nextRouter.pathname === '/' ? 'page' : 'false'}
            className="font-medium"
          >
            Home
          </a>
        </Link>

        <nav className="flex items-center gap-4">
          {menuItems.map((menuItem) => (
            <Link href={menuItem.path} key={menuItem.path}>
              <a
                className={`text-sm font-medium ${
                  nextRouter.pathname === menuItem.path && 'underline'
                }`}
                {...(menuItem.external && {
                  target: '_blank',
                  rel: 'noreferrer',
                })}
                {...(nextRouter.pathname === menuItem.path && {
                  'aria-current': 'page',
                })}
              >
                {menuItem.title}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
