import Link from 'next/link'

import { getBlogs } from '../lib/getPosts'
import { getProjects } from '../lib/getProjects'

import Posts from '@/components/Posts'
import Projects from '@/components/Projects'

export default function Index({ blogPosts, projectPosts }) {
  return (
    <article className="prose max-w-none prose-slate dark:prose-invert">
      <h1>Mark Mead</h1>

      <p className="lead">
        Welcome to my website. Here you will find posts about things.
      </p>

      <h2>Featured Projects</h2>

      <Projects projectPosts={projectPosts} stacked={true} />

      <h2>Latest Posts</h2>

      <Posts blogPosts={blogPosts} />

      <div className="flex justify-center">
        <Link href="/blog">
          <a className="block px-5 py-3 no-underline border rounded-lg bg-slate-50 border-slate-100 dark:bg-slate-800 dark:border-slate-700">
            <span className="text-sm font-normal">View More</span>
          </a>
        </Link>
      </div>
    </article>
  )
}

export async function getStaticProps() {
  const blogPosts = getBlogs(['title', 'slug', 'description', 'date', 'tags'])
  const projectPosts = getProjects([
    'title',
    'slug',
    'description',
    'tags',
    'featured',
  ]).filter((projectData) => projectData.featured)

  return {
    props: { blogPosts, projectPosts },
  }
}
