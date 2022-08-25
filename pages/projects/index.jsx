import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { projectFilePaths, PROJECTS_PATH } from '../../utils/mdx'
import Projects from '../../components/Projects'

export default function ProjectsIndex({ projects }) {
  return (
    <article className="prose max-w-none prose-slate dark:prose-invert">
      <h1>Projects</h1>

      <p className="lead">Here are projects about things.</p>

      <Projects projects={projects} stacked={false} />
    </article>
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
    .sort((project) => project.data.featured && -1)

  return { props: { projects } }
}
