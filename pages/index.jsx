import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'
import Posts from '../components/Posts'

export default function Index({ posts }) {
  return (
    <>
      <article className="prose prose-lg">
        <h1>Mark Mead</h1>

        <p className="lead">
          Welcome to my website. Here you will find posts about different
          things.
        </p>

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
