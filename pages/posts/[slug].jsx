import { useEffect } from 'react'

import Head from 'next/head'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Prism from 'prismjs'

import 'prismjs/components/prism-markup-templating.js'
import 'prismjs/components/prism-php.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/components/prism-ruby.js'
import 'prismjs/components/prism-erb.js'
import 'prismjs/components/prism-haml.js'

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { postFilePaths, POSTS_PATH } from '../../utils/markdown'

export default function PostPage({ source, frontMatter }) {
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${frontMatter.title}`,
    image: ['https://www.markmead.dev/og.jpg'],
    datePublished: `${frontMatter.date}`,
    dateModified: `${frontMatter.date}`,
    author: {
      '@type': 'Person',
      name: 'Mark Mead',
      url: 'https://twitter.com/itsmarkmead',
    },
  }

  useEffect(() => {
    Prism.highlightAll()
  })

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

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

        <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
      </article>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.md`)
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
  const paths = postFilePaths
    .map((path) => path.replace(/\.md?$/, ''))
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
