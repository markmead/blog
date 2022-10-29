import Head from 'next/head'

import Posts from '@/components/Posts'

import { getBlogs } from '@/lib/getPosts'

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

      <article className="prose max-w-none prose-slate dark:prose-invert">
        <h1>Posts</h1>

        <p className="lead">Here are posts about things.</p>

        <Posts blogPosts={blogPosts} />
      </article>
    </>
  )
}

export async function getStaticProps() {
  const blogPosts = getBlogs(['title', 'slug', 'description', 'date', 'tags'])

  return {
    props: { blogPosts },
  }
}
