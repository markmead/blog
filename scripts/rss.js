const { promises: fs } = require('fs')
const path = require('path')
const Feed = require('feed').Feed
const matter = require('gray-matter')
const fetch = require('node-fetch')

async function generate() {
  const feed = new Feed({
    title: 'Mark Mead',
    description: 'RSS feed for blog posts.',
    id: 'https://www.markmead.dev/',
    link: 'https://www.markmead.dev/feed.xml',
    language: 'en',
    image: 'https://www.markmead.dev/og.png',
    favicon: 'https://www.markmead.dev/favicon.ico',
    feedLinks: {
      json: 'https://www.markmead.dev/json',
      atom: 'https://www.markmead.dev/atom',
    },
    author: {
      name: 'Mark Mead',
      link: 'https://www.markmead.dev/',
    },
  })

  const response = await fetch(
    'https://hyperui-git-feat-blog-rss-feed-markmead.vercel.app/rss.json'
  )
  const data = await response.json()

  const posts = await fs.readdir(path.join(__dirname, '..', 'posts'))

  await Promise.all(
    posts.map(async (name) => {
      const content = await fs.readFile(
        path.join(__dirname, '..', 'posts', name)
      )

      const frontmatter = matter(content)

      const slug = name.replace(/\.md?/, '')

      feed.addItem({
        title: frontmatter.data.title,
        id: slug,
        link: `https://www.markmead.dev/blog/${slug}`,
        description: frontmatter.data.description,
        content: frontmatter.content,
        author: [
          {
            name: 'Mark Mead',
            link: 'https://www.markmead.dev/',
          },
        ],
        date: new Date(frontmatter.data.date),
      })
    })
  ).then(() => {
    data.items.map(async (post) => {
      feed.addItem({
        title: post.title,
        id: post.id,
        link: post.url,
        description: post.description,
        content: post.content_html,
        author: [
          {
            name: post.author.name,
            link: post.author.url,
          },
        ],
        date: new Date(post.date_modified),
      })
    })
  })

  await fs.writeFile('./public/rss.xml', feed.rss2())
  await fs.writeFile('./public/rss.json', feed.json1())
  await fs.writeFile('./public/rss.atom', feed.atom1())
}

generate()
