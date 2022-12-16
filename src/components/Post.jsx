import Link from 'next/link'

export default function Post({ path, title, description, date, tags }) {
  return (
    <li className="p-0 m-0">
      <Link as={`/blog/${path.replace(/\.md?$/, '')}`} href={`/blog/[slug]`}>
        <a className="block p-4 m-0 no-underline bg-white border border-black hover:invert">
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
