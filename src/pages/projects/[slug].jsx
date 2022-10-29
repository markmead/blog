import { useEffect } from 'react'

import Head from 'next/head'

import Prism from 'prismjs'

import 'prismjs/components/prism-markup-templating.js'
import 'prismjs/components/prism-php.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/components/prism-ruby.js'
import 'prismjs/components/prism-erb.js'
import 'prismjs/components/prism-haml.js'

import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { getProjectPaths } from '@/lib/getProjects'

export default function PostPage({ projectSource, projectFrontmatter }) {
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${projectFrontmatter.title}`,
    image: ['https://www.markmead.dev/og.jpg'],
    datePublished: `${projectFrontmatter.date}`,
    dateModified: `${projectFrontmatter.date}`,
    author: {
      '@type': 'Person',
      name: 'Mark Mead',
      url: 'https://twitter.com/itsmarkmead',
    },
  }

  useEffect(() => Prism.highlightAll())

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <article className="prose max-w-none prose-slate dark:prose-invert">
        <h1>{projectFrontmatter.title}</h1>

        <p className="lead">{projectFrontmatter.description}</p>

        <MDXRemote {...projectSource} />
      </article>
    </>
  )
}

export async function getStaticProps({ params: { slug } }) {
  const projectSlug = slug

  const projectSource = fs.readFileSync(
    `./src/data/projects/${projectSlug}.mdx`
  )

  const { content: projectContent, data: projectData } = matter(projectSource)

  const mdxSource = await serialize(projectContent, {
    mdxOptions: {
      rehypePlugins: [],
      remarkPlugins: [],
    },
    scope: projectData,
  })

  return {
    props: {
      projectFrontmatter: projectData,
      projectSource: mdxSource,
    },
  }
}

export async function getStaticPaths() {
  const projectPaths = getProjectPaths()

  return {
    paths: projectPaths,
    fallback: false,
  }
}
