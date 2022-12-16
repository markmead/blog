import Head from 'next/head'

import { getBlogs } from '@/lib/getPosts'

import Grid from '@/components/Grid'

export default function PostsIndex({ blogPosts }) {
  return (
    <>
      <Head>
        <title>Blog | Mark Mead</title>

        <meta
          content="Development blog posts about Livewire, Laravel, JavaScript and much more."
          name="description"
          key="description"
        />
      </Head>

      <h1>Posts</h1>

      <p className="lead">Here are posts about things.</p>

      <Grid gridItems={blogPosts} />
    </>
  )
}

export async function getStaticProps() {
  const blogPosts = getBlogs(['title', 'slug', 'description', 'date', 'tags'])

  return {
    props: { blogPosts },
  }
}
