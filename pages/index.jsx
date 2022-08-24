import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { postFilePaths, POSTS_PATH } from '../utils/mdx'
import Posts from '../components/Posts'

export default function Index({ posts }) {
  return (
    <>
      <article className="prose max-w-none prose-slate">
        <h1>Mark Mead</h1>

        <p className="lead">
          Welcome to my website. Here you will find posts about things.
        </p>

        <h2>Latest Posts</h2>

        <Posts posts={posts} />
      </article>
    </>
  )
}

export function getStaticProps() {
  const posts = postFilePaths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
      const { content, data } = matter(source)

      return {
        content,
        data,
        filePath,
      }
    })
    .slice(0, 4)

  return { props: { posts } }
}
