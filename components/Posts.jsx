import Post from './Post'

export default function Posts({ posts }) {
  return (
    <ul className="p-0 space-y-4 list-none">
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
