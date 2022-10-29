import Post from '@/components/Post'

export default function Posts({ blogPosts }) {
  return (
    <ul className="p-0 space-y-4 list-none">
      {blogPosts.map((blogData) => (
        <Post
          key={blogData.slug}
          path={blogData.slug}
          title={blogData.title}
          description={blogData.description}
          date={blogData.date}
          tags={blogData.tags}
        />
      ))}
    </ul>
  )
}
