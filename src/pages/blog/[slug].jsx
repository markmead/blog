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

import { getBlogPaths } from '@/lib/getPosts'

import Prose from '@/components/Prose'

export default function PostPage({ blogSource, blogFrontmatter }) {
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${blogFrontmatter.title}`,
    image: ['https://www.markmead.dev/og.jpg'],
    datePublished: `${blogFrontmatter.date}`,
    dateModified: `${blogFrontmatter.date}`,
  }

  useEffect(() => Prism.highlightAll())

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        <title>{blogFrontmatter.title}</title>

        <meta
          content={blogFrontmatter.description}
          name="description"
          key="description"
        />
      </Head>

      <Prose>
        <h1>{blogFrontmatter.title}</h1>

        <p className="lead">{blogFrontmatter.description}</p>

        <MDXRemote {...blogSource} />
      </Prose>
    </>
  )
}

export async function getStaticProps({ params: { slug } }) {
  const blogSlug = slug

  const blogSource = fs.readFileSync(`./src/data/posts/${blogSlug}.mdx`)

  const { content: blogContent, data: blogData } = matter(blogSource)

  const mdxSource = await serialize(blogContent, {
    mdxOptions: {
      rehypePlugins: [],
      remarkPlugins: [],
    },
    scope: blogData,
  })

  return {
    props: {
      blogFrontmatter: blogData,
      blogSource: mdxSource,
    },
  }
}

export async function getStaticPaths() {
  const blogPaths = getBlogPaths()

  return {
    paths: blogPaths,
    fallback: false,
  }
}
