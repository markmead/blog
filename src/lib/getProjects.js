import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const directory = join(process.cwd(), '/src/data/projects')

export function getProjectSlugs() {
  return fs.readdirSync(directory)
}

export function getProjectPaths() {
  const slugs = getProjectSlugs().map(function (slug) {
    return slug.replace(/\.mdx$/, '')
  })

  return slugs.map((slug) => {
    return {
      params: {
        slug,
      },
    }
  })
}

export function getProjectBySlug(slug, fields = []) {
  const trueSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(directory, `${trueSlug}.mdx`)
  const contents = fs.readFileSync(fullPath, 'utf8')
  const { data: fileData, content } = matter(contents)

  const data = {}

  fields.forEach((dataField) => {
    if (dataField === 'slug') {
      data[dataField] = trueSlug
    }

    if (dataField === 'content') {
      data[dataField] = content
    }

    if (typeof fileData[dataField] !== 'undefined') {
      data[dataField] = fileData[dataField]
    }
  })

  return data
}

export function getProjects(fields = []) {
  const slugs = getProjectSlugs()

  const posts = slugs
    .map((slug) => getProjectBySlug(slug, fields))
    .sort((postA, postB) =>
      new Date(postA.date) < new Date(postB.date) ? 1 : -1
    )

  return posts
}
