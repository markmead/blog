import Link from 'next/link'

import { getBlogs } from '@/lib/getPosts'
import { getProjects } from '@/lib/getProjects'

import Posts from '@/components/Posts'
import Projects from '@/components/Projects'
import Prose from '@/components/Prose'

export default function Index({ blogPosts, projectPosts }) {
  return (
    <Prose>
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
          <a>View More</a>
        </Link>
      </div>
    </Prose>
  )
}

export async function getStaticProps() {
  const blogPosts = getBlogs([
    'title',
    'slug',
    'description',
    'date',
    'tags',
  ]).slice(0, 3)

  const projectPosts = getProjects([
    'title',
    'slug',
    'description',
    'role',
    'tags',
    'featured',
  ]).filter((projectData) => projectData.featured)

  return {
    props: { blogPosts, projectPosts },
  }
}
