import Link from 'next/link'

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import {
  postFilePaths,
  POSTS_PATH,
  projectFilePaths,
  PROJECTS_PATH,
} from '../utils/mdx'

import Posts from '../components/Posts'
import Projects from '../components/Projects'

export default function Index({ posts, projects }) {
  return (
    <article className="prose max-w-none prose-slate dark:prose-invert">
      <h1>Mark Mead</h1>

      <p className="lead">
        Welcome to my website. Here you will find posts about things.
      </p>

      <h2>Featured Projects</h2>

      <Projects projects={projects} stacked={true} />

      <h2>Latest Posts</h2>

      <Posts posts={posts} />

      <div className="flex justify-center">
        <Link href="/posts">
          <a className="no-underline bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg px-5 py-3 block">
            <span className="text-sm font-normal">View all posts</span>
          </a>
        </Link>
      </div>
    </article>
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
    .sort((post) => post.data.date && -1)
    .slice(0, 3)

  const projects = projectFilePaths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(PROJECTS_PATH, filePath))
      const { content, data } = matter(source)

      return {
        content,
        data,
        filePath,
      }
    })
    .filter((project) => project.data.featured)
    .sort((project) => project.data.featured && -1)
    .slice(0, 2)

  return { props: { posts, projects } }
}
