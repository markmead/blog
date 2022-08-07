import Link from 'next/link'

export default function Header() {
  return (
    <>
      <nav className="flex gap-4">
        <Link href="/">
          <a>Home</a>
        </Link>

        <Link href="/posts">
          <a>Posts</a>
        </Link>

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
