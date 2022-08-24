import Link from 'next/link'

import Post from './Post'

export default function Posts({ posts }) {
  return (
    <>
      <ul className="list-none p-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map(({ filePath, data }) => (
          <Post
            key={filePath}
            path={filePath}
            title={data.title}
            description={data.description}
            date={data.date}
            tags={data.tags}
          />
        ))}
      </ul>
    </>
  )
}
