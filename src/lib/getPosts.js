import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '/src/data/posts')

export function getBlogSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getBlogPaths() {
  const blogSlugs = getBlogSlugs().map(function (blogSlug) {
    return blogSlug.replace(/\.mdx$/, '')
  })

  return blogSlugs.map((blogSlug) => {
    return {
      params: {
        slug: blogSlug,
      },
    }
  })
}

export function getPostBySlug(blogSlug, dataFields = []) {
  const trueSlug = blogSlug.replace(/\.mdx$/, '')
  const fullPath = join(postsDirectory, `${trueSlug}.mdx`)
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

export function getBlogs(dataFields = []) {
  const blogSlugs = getBlogSlugs()

  const blogPosts = blogSlugs
    .map(function (blogSlug) {
      return getPostBySlug(blogSlug, dataFields)
    })
    .sort(function (blogPostA, blogPostB) {
      return new Date(blogPostA.date) < new Date(blogPostB.date) ? 1 : -1
    })

  return blogPosts
}
