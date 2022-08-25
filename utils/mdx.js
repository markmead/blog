import fs from 'fs'
import path from 'path'

export const POSTS_PATH = path.join(process.cwd(), 'posts')

export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter((path) => /\.mdx?$/.test(path))

export const PROJECTS_PATH = path.join(process.cwd(), 'projects')

export const projectFilePaths = fs
  .readdirSync(PROJECTS_PATH)
  .filter((path) => /\.mdx?$/.test(path))
