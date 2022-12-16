import Head from 'next/head'

import { getBlogs } from '@/lib/getPosts'

import Posts from '@/components/Posts'
import Prose from '@/components/Prose'

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

      <Prose>
        <h1>Posts</h1>

        <p className="lead">Here are posts about things.</p>

        <Posts blogPosts={blogPosts} />
      </Prose>
    </>
  )
}

export async function getStaticProps() {
  const blogPosts = getBlogs(['title', 'slug', 'description', 'date', 'tags'])

  return {
    props: { blogPosts },
  }
}
