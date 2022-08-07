import Head from 'next/head'

import ReactMarkdown from 'react-markdown'

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { projectFilePaths, PROJECTS_PATH } from '../../utils/markdown'

const components = {}

export default function ProjectPage({ source, frontMatter }) {
  return (
    <>
      <Head>
        <title>{frontMatter.title} | Mark Mead</title>
        <meta
          name="description"
          content={frontMatter.description}
          key="description"
        />
        <meta
          property="og:title"
          content="{frontMatter.title} | Mark Mead"
          key="og:title"
        />
        <meta
          property="og:description"
          content={frontMatter.description}
          key="og:description"
        />
      </Head>

      <article className="prose max-w-none prose-slate dark:prose-invert">
        <h1>{frontMatter.title}</h1>

        <p className="lead">{frontMatter.description}</p>

        <ReactMarkdown>{source}</ReactMarkdown>
      </article>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(PROJECTS_PATH, `${params.slug}.md`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  return {
    props: {
      source: content,
      frontMatter: data,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = projectFilePaths
    .map((path) => path.replace(/\.md?$/, ''))
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
