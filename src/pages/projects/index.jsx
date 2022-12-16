import Head from 'next/head'

import { getProjects } from '@/lib/getProjects'

import Grid from '@/components/Grid'

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

      <h1>Projects</h1>

      <p className="lead">Here are projects about things.</p>

      <Grid gridItems={projectPosts} isProject />
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
