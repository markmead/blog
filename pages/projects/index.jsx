import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { projectFilePaths, PROJECTS_PATH } from '../../utils/markdown'

import Projects from '../../components/Projects'

export default function ProjectsIndex({ projects }) {
  return (
    <>
      <Head>
        <title>Projects | Mark Mead</title>
        <meta
          property="og:title"
          content="Projects | Mark Mead"
          key="og:title"
        />
      </Head>

      <article className="prose max-w-none prose-slate dark:prose-invert">
        <h1>Projects</h1>

        <p className="lead">Here are projects about things.</p>

        <Projects projects={projects} stacked={false} />
      </article>
    </>
  )
}

export function getStaticProps() {
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
    .sort((projectA, projectB) =>
      projectA.data.featured < projectB.data.featured ? 0 : -1
    )

  return { props: { projects } }
}
