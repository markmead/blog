import Link from 'next/link'

export default function Post({ path, title, description, date, tags }) {
  return (
    <li className="p-0 m-0">
      <Link as={`/posts/${path.replace(/\.md?$/, '')}`} href={`/posts/[slug]`}>
        <a className="block p-4 m-0 no-underline border border-gray-100 rounded-lg bg-slate-50 dark:border-gray-700 sm:bg-transparent sm:hover:bg-slate-50 dark:bg-gray-800 sm:dark:hover:bg-gray-800">
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
