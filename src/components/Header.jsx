import { useRouter } from 'next/router'

import Link from 'next/link'

export default function Header() {
  const nextRouter = useRouter()

  const menuItems = [
    { title: 'Blog', path: '/blog', external: false },
    { title: 'Projects', path: '/projects', external: false },
    {
      title: 'GitHub',
      path: 'https://github.com/markmead',
      external: true,
    },
  ]

  return (
    <header>
      <div className="flex items-center justify-between">
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
