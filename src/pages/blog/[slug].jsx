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

export default function BlogShow({ source, frontmatter }) {
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${frontmatter.title}`,
    image: ['https://www.markmead.dev/og.jpg'],
    datePublished: `${frontmatter.date}`,
    dateModified: `${frontmatter.date}`,
  }

  useEffect(() => Prism.highlightAll())

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        <title>{frontmatter.title}</title>

        <meta
          content={frontmatter.description}
          name="description"
          key="description"
        />
      </Head>

      <Prose>
        <h1>{frontmatter.title}</h1>

        <p className="lead">{frontmatter.description}</p>

        <MDXRemote {...source} />
      </Prose>
    </>
  )
}

export async function getStaticProps({ params: { slug } }) {
  const source = fs.readFileSync(`./src/data/posts/${slug}.mdx`)
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [],
      remarkPlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      frontmatter: data,
      source: mdxSource,
    },
  }
}

export async function getStaticPaths() {
  const paths = getBlogPaths()

  return {
    paths,
    fallback: false,
  }
}
