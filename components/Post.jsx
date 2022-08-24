import Link from 'next/link'

export default function Post({ path, title, description, date, tags }) {
  return (
    <li className="m-0 p-0">
      <Link as={`/posts/${path.replace(/\.mdx?$/, '')}`} href={`/posts/[slug]`}>
        <a className="no-underline px-4 py-6 border border-white/50 bg-white/25 shadow-sm rounded-lg block m-0">
          <h3 className="m-0">{title}</h3>

          <div className="font-normal">
            <p>{description}</p>

            <small className="flex gap-2">
              <time>{date}</time>
              <span>&middot;</span>
              <span>{tags.join(', ')}</span>
            </small>
          </div>
        </a>
      </Link>
    </li>
  )
}
