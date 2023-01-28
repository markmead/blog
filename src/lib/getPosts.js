import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const directory = join(process.cwd(), '/src/data/posts')

export function getBlogSlugs() {
  return fs.readdirSync(directory)
}

export function getBlogPaths() {
  const slugs = getBlogSlugs().map(function (slug) {
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

export function getPostBySlug(slug, fields = []) {
  const trueSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(directory, `${trueSlug}.mdx`)
  const contents = fs.readFileSync(fullPath, 'utf8')
  const { data: fileData, content } = matter(contents)

  const data = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      data[field] = trueSlug
    }

    if (field === 'content') {
      data[field] = content
    }

    if (typeof fileData[field] !== 'undefined') {
      data[field] = fileData[field]
    }
  })

  return data
}

export function getBlogs(fields = []) {
  const slugs = getBlogSlugs()

  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((postA, postB) =>
      new Date(postA.date) < new Date(postB.date) ? 1 : -1
    )

  return posts
}
