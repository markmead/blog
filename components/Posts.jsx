import Link from 'next/link'

export default function Posts({ posts }) {
  return (
    <>
      <ul className="list-none p-0">
        {posts.map((post) => (
          <li key={post.filePath} className="p-0">
            <Link
              as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
              href={`/posts/[slug]`}
            >
              <a className="no-underline p-4 bg-slate-50 border border-gray-100 dark:border-gray-700 sm:bg-transparent sm:border-transparent sm:hover:bg-slate-50 sm:hover:border-gray-100 dark:bg-gray-800 sm:dark:hover:bg-gray-800 sm:dark:hover:border-gray-700 rounded-lg block">
                <h3 className="m-0">{post.data.title}</h3>

                <div className="font-normal">
                  <p>{post.data.description}</p>

                  <small className="flex gap-2">
                    <time>{post.data.date}</time>
                    <span>&middot;</span>
                    <span>{post.data.tags.join(', ')}</span>
                  </small>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
