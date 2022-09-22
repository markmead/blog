const { promises: fs } = require('fs')
const path = require('path')
const Feed = require('feed').Feed
const matter = require('gray-matter')
const fetch = require('node-fetch')
const showdown = require('showdown')
const converter = new showdown.Converter({ tables: 'true' })

async function generate() {
  const rssFeed = new Feed({
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

  const hyperPosts = await fetch('https://www.hyperui.dev/rss.json')
  const hyperData = await hyperPosts.json()

  const selfPosts = await fs.readdir(path.join(__dirname, '..', 'posts'))

  await Promise.all(
    selfPosts.map(async (postName) => {
      const postContent = await fs.readFile(
        path.join(__dirname, '..', 'posts', postName)
      )

      const postFrontmatter = matter(postContent)
      const { data: postData, content: postMarkdown } = postFrontmatter

      const postSlug = postName.replace(/\.md?/, '')

      const convertedPostTags = postData.tags.map((postTag) => ({
        name: postTag,
      }))

      rssFeed.addItem({
        title: postData.title,
        id: postSlug,
        link: `https://www.markmead.dev/blog/${postSlug}`,
        description: postData.description,
        content: converter.makeHtml(postMarkdown),
        author: [
          {
            name: 'Mark Mead',
            link: 'https://www.markmead.dev/',
          },
        ],
        date: new Date(postData.date),
        category: convertedPostTags,
      })
    })
  ).then(() => {
    hyperData.items.map(async (hyperPost) => {
      const convertedPostTags = hyperPost.tags.map((postTag) => ({
        name: postTag,
      }))

      rssFeed.addItem({
        title: hyperPost.title,
        id: hyperPost.id,
        link: hyperPost.url,
        description: hyperPost.description,
        content: hyperPost.content_html,
        author: [
          {
            name: hyperPost.author.name,
            link: hyperPost.author.url,
          },
        ],
        date: new Date(hyperPost.date_modified),
        category: convertedPostTags,
      })
    })
  })

  await fs.writeFile('./public/rss.xml', rssFeed.rss2())
  await fs.writeFile('./public/rss.json', rssFeed.json1())
  await fs.writeFile('./public/rss.atom', rssFeed.atom1())
}

generate()
