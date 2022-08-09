import { useRouter } from 'next/router'

import Link from 'next/link'

export default function Header() {
  let nextRouter = useRouter()

  let menuItems = [
    { title: 'Posts', path: '/posts' },
    { title: 'Uses', path: '/uses' },
  ]

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
        <Link href="/">
          <a>
            <span className="sr-only">Home</span>
            <span className="text-lg">🏡</span>
          </a>
        </Link>

        <nav className="flex gap-4">
          {menuItems.map((menuItem) => (
            <Link href={menuItem.path} key={menuItem.path}>
              <a
                className={
                  nextRouter.pathname === menuItem.path ? 'font-medium' : ''
                }
              >
                {menuItem.title}
              </a>
            </Link>
          ))}

          <a
            href="https://twitter.com/itsmarkmead"
            rel="noopener noreferrer"
            target="_blank"
          >
            Twitter
          </a>

          <a
            href="https://github.com/markmead"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </nav>
      </header>
    </>
  )
}
