import Head from 'next/head'

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { postFilePaths, POSTS_PATH } from '../../utils/markdown'

import Posts from '../../components/Posts'

export default function PostsIndex({ posts }) {
  return (
    <>
      <Head>
        <title>Blog | Mark Mead</title>
        <meta property="og:title" content="Blog | Mark Mead" key="og:title" />
      </Head>

      <article className="prose max-w-none prose-slate dark:prose-invert">
        <h1>Posts</h1>

        <p className="lead">Here are posts about things.</p>

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
    .sort((postA, postB) => (postA.data.date < postB.data.date ? 0 : -1))

  return { props: { posts } }
}
