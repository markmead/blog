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
    <header className="bg-white/25 border-b border-white/50 relative">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link href="/">
            <a
              aria-current={nextRouter.pathname === '/' ? 'page' : 'false'}
              target="_self"
              rel="self"
            >
              <span class="uppercase tracking-widest text-xs text-slate-700 font-bold">
                Mark Mead
              </span>
            </a>
          </Link>

          <nav className="flex gap-4">
            {menuItems.map((menuItem) => (
              <Link href={menuItem.path} key={menuItem.path}>
                <a
                  className={
                    nextRouter.pathname === menuItem.path
                      ? 'text-slate-600'
                      : 'text-slate-700 hover:text-slate-600'
                  }
                  aria-current={
                    nextRouter.pathname === menuItem.path ? 'page' : 'false'
                  }
                  target={menuItem.external ? '_blank' : '_self'}
                  rel={menuItem.external ? 'nofollow noreferrer' : 'self'}
                >
                  <span className="text-xs">{menuItem.title}</span>
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
