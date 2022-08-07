import { useRouter } from 'next/router'

import Link from 'next/link'

export default function Header() {
  let nextRouter = useRouter()

  let menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Posts', path: '/posts' },
    { title: 'Uses', path: '/uses' },
  ]

  return (
    <>
      <nav className="flex gap-4 p-4 justify-center bg-gray-100 rounded-lg">
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
    </>
  )
}
