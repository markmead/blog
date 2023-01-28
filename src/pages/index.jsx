import Link from 'next/link'

import { getBlogs } from '@/lib/getPosts'
import { getProjects } from '@/lib/getProjects'

import Grid from '@/components/Grid'

export default function Index({ blogs, projects }) {
  return (
    <>
      <h1>Mark Mead</h1>

      <p className="lead">
        Welcome to my website. Here you will find posts about things.
      </p>

      <h2>Featured Projects</h2>

      <Grid items={projects} stacked project />

      <h2>Latest Posts</h2>

      <Grid items={blogs} />

      <div className="flex justify-center">
        <Link href="/blog">
          <a>View More</a>
        </Link>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const blogs = getBlogs([
    'title',
    'slug',
    'description',
    'date',
    'tags',
  ]).slice(0, 3)

  const projects = getProjects([
    'title',
    'slug',
    'description',
    'role',
    'tags',
    'featured',
  ]).filter((project) => project.featured)

  return {
    props: { blogs, projects },
  }
}
