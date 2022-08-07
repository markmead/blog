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
              <a className="no-underline p-4 hover:bg-gray-100 rounded-lg block">
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
