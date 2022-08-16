import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'
import Posts from '../../components/Posts'

export default function PostsIndex({ posts }) {
  return (
    <>
      <article className="prose max-w-none prose-slate">
        <h1>Posts</h1>

        <p className="lead">Here are posts about things.</p>

        <Posts posts={posts} />
      </article>
    </>
  )
}

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { posts } }
}
