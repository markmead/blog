import { useRouter } from 'next/router'

import Link from 'next/link'

export default function Header() {
  let nextRouter = useRouter()

  let menuItems = [
    { title: 'Posts', path: '/posts', external: false },
    { title: 'Uses', path: '/uses', external: false },
    {
      title: 'Twitter',
      path: 'https://twitter.com/itsmarkmead',
      external: true,
    },
    { title: 'GitHub', path: 'https://github.com/markmead', external: true },
  ]

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
        <Link href="/">
          <a
            aria-current={nextRouter.pathname === '/' ? 'page' : 'false'}
            target="_self"
            rel="self"
          >
            <span className="sr-only">Home</span>
            <span className="text-lg sm:text-xl">🏡</span>
          </a>
        </Link>

        <nav className="flex gap-4">
          {menuItems.map((menuItem) => (
            <Link href={menuItem.path} key={menuItem.path}>
              <a
                className={
                  nextRouter.pathname === menuItem.path
                    ? 'font-medium text-slate-700'
                    : 'text-slate-600 hover:text-slate-700'
                }
                aria-current={
                  nextRouter.pathname === menuItem.path ? 'page' : 'false'
                }
                target={menuItem.external ? '_blank' : '_self'}
                rel={menuItem.external ? 'nofollow noreferrer' : 'self'}
              >
                <span className="text-sm">{menuItem.title}</span>
              </a>
            </Link>
          ))}
        </nav>
      </header>
    </>
  )
}
