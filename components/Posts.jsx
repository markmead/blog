import Post from './Post'

export default function Posts({ posts }) {
  return (
    <ul className="list-none p-0 space-y-4">
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
  )
}
