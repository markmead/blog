import Link from 'next/link'

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'
import Posts from '../components/Posts'

export default function Index({ posts }) {
  return (
    <>
      <article className="prose max-w-none prose-slate">
        <h1>Mark Mead</h1>

        <p className="lead">
          Welcome to my website. Here you will find posts about things.
        </p>

        <Posts posts={posts} />

        <div className="flex justify-center">
          <Link href="/posts">
            <a className="no-underline bg-gray-100 rounded-lg px-5 py-3 block">
              <span className="text-sm font-normal">View all posts</span>
            </a>
          </Link>
        </div>
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
    .slice(0, 3)

  return { props: { posts } }
}
