---
title: Shopify Add to Cart with Vanilla JS
description: Easily create an autogrowing textarea with Alpine JS.
date: 2021/11/20
tags: [javascript, shopify]
---

I adore DEV.to. It's an amazing platform that lets developers all around the
world share knowledge and ideas.

The "problem" with DEV.to as a content creator is that as much as it's nice
seeing the views increase on DEV.to, you also want those views going to your
personal website. This is especially the case if you are selling products
through that website.

This has led to me in the past copy and pasting `.md` files into DEV.to. This
works fine, but it's slow and DEV.to has a way of automating this.

For this tutorial, I will use my personal website that uses Nuxt JS as an
example.

## Nuxt JS RSS Feed

First off, we need an RSS feed. The best way of doing this is with the
`@nuxtjs/feed` module that you can install with:

```shell[Install @nuxtjs/feed module to create RSS feed]
yarn add -D @nuxtjs/feed
```

For my website, I am using the `@nuxtjs/content` module and therefore I need to
make some adjustments to how the RSS feed is created. If you are not using that,
then
[check out the module docs](https://github.com/nuxt-community/feed-module#readme)
for more examples.

The config that was needed is based on the
[integrating with @nuxtjs/feed module](https://content.nuxtjs.org/integrations/).

Here is the code used in the `nuxt.config.js` file:

```js
let posts = []

const constructFeedItem = (post, dir, hostname) => {
  const url = `${hostname}/${dir}/${post.slug}`

  return {
    title: post.title,
    id: url,
    link: url,
    content: post.bodyPlainText,
  }
}

const create = async (feed, args) => {
  const { $content } = require('@nuxt/content')
  const [filePath, ext] = args
  const hostname = 'https://markmead.dev/'

  feed.options = {
    title: 'Development Blogs',
    description: 'Short and to the point development blogs.',
    link: `${hostname}/feed.${ext}`,
  }

  posts = await $content(filePath)
    .where({ published: true })
    .sortBy('title')
    .fetch()

  for (const post of posts) {
    const feedItem = await constructFeedItem(post, filePath, hostname)

    feed.addItem(feedItem)
  }

  return feed
}
```

```js
buildModules: ['@nuxt/content', '@nuxtjs/feed']
```

```js
feed: [
  {
    path: '/feed.xml',
    create: create,
    cacheTime: 1000 * 60 * 15,
    type: 'rss2',
    data: ['blogs', 'xml'],
  },
]
```

```js
hooks: {
  'content:file:beforeInsert': document => {
    if (document.extension === '.md') {
      document.bodyPlainText = document.text
    }
  }
}
```

If this is hard to follow then it is basically a 1to1 of the documentation
linked above, but also you can look at the
[source code of my website](https://github.com/markmead/portfolio/blob/master/nuxt.config.js).

## Automatically Deploy Blogs into DEV.to

There's now an RSS feed we can share with DEV.to in the "Publishing to DEV
Community from RSS" section found in
[your account settings](https://dev.to/settings/extensions).

You can then click "Fetch Feed Now" and head on over to your dashboard. If it
worked you will see all of your posts in DEV.to.

From here you'll want to edit the posts and adjust the formatting, the main
issue comes with code sections. It's worth adding categories as well so you can
increase the chance of your blog post being seen.

There are some major benefits to handling posts this way:

- Speed of uploading
- Auto "originally published on yourwebsite.com" at the top of the DEV.to post
- You can use your website URL as the canonical URL
