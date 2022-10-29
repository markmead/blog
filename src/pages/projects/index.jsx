import { getProjects } from '@/lib/getProjects'

import Projects from '@/components/Projects'

export default function ProjectsIndex({ projectPosts }) {
  return (
    <>
      <article className="prose max-w-none prose-slate dark:prose-invert">
        <h1>Projects</h1>

        <p className="lead">Here are projects about things.</p>

        <Projects projectPosts={projectPosts} stacked={false} />
      </article>
    </>
  )
}

export async function getStaticProps() {
  const projectPosts = getProjects([
    'title',
    'slug',
    'description',
    'role',
    'tags',
  ])

  return {
    props: { projectPosts },
  }
}
