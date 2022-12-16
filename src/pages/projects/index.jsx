import Head from 'next/head'

import { getProjects } from '@/lib/getProjects'

import Projects from '@/components/Projects'

import Prose from '@/components/Prose'

export default function ProjectsIndex({ projectPosts }) {
  return (
    <>
      <Head>
        <title>Projects | Mark Mead</title>

        <meta
          content="Highlights of personal projects that I have worked on."
          name="description"
          key="description"
        />
      </Head>

      <Prose>
        <h1>Projects</h1>

        <p className="lead">Here are projects about things.</p>

        <Projects projectPosts={projectPosts} stacked={false} />
      </Prose>
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
