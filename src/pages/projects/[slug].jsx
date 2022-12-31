import Head from 'next/head'

import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { getProjectPaths } from '@/lib/getProjects'

import Prose from '@/components/Prose'

export default function PostPage({ projectSource, projectFrontmatter }) {
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${projectFrontmatter.title}`,
    image: ['https://www.markmead.dev/og.jpg'],
    datePublished: `${projectFrontmatter.date}`,
    dateModified: `${projectFrontmatter.date}`,
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        <title>{projectFrontmatter.title}</title>

        <meta
          content={projectFrontmatter.description}
          name="description"
          key="description"
        />
      </Head>

      <Prose>
        <h1>{projectFrontmatter.title}</h1>

        <p className="lead">{projectFrontmatter.description}</p>

        <MDXRemote {...projectSource} />
      </Prose>
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
