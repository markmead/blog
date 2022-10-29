import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const projectsDirectory = join(process.cwd(), '/src/data/projects')

export function getProjectSlugs() {
  return fs.readdirSync(projectsDirectory)
}

export function getProjectPaths() {
  const projectSlugs = getProjectSlugs().map(function (projectSlug) {
    return projectSlug.replace(/\.mdx$/, '')
  })

  return projectSlugs.map((projectSlug) => {
    return {
      params: {
        slug: projectSlug,
      },
    }
  })
}

export function getProjectBySlug(projectSlug, dataFields = []) {
  const trueSlug = projectSlug.replace(/\.mdx$/, '')
  const fullPath = join(projectsDirectory, `${trueSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data: fileData, content: fileContent } = matter(fileContents)

  const blogsData = {}

  dataFields.forEach((dataField) => {
    if (dataField === 'slug') {
      blogsData[dataField] = trueSlug
    }

    if (dataField === 'content') {
      blogsData[dataField] = fileContent
    }

    if (typeof fileData[dataField] !== 'undefined') {
      blogsData[dataField] = fileData[dataField]
    }
  })

  return blogsData
}

export function getProjects(dataFields = []) {
  const projectSlugs = getProjectSlugs()

  const projectPosts = projectSlugs
    .map(function (projectSlug) {
      return getProjectBySlug(projectSlug, dataFields)
    })
    .sort(function (projectPostA, projectPostB) {
      return new Date(projectPostA.date) < new Date(projectPostB.date) ? 1 : -1
    })

  return projectPosts
}
