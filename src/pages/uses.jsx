import Head from 'next/head'

import { usesCurrent, usesPrevious } from '@/data/usesPage'

import Prose from '@/components/Prose'

export default function Uses() {
  return (
    <>
      <Head>
        <title>Uses | Mark Mead</title>

        <meta
          content="What tech stack that I am currently and have previously used."
          name="description"
          key="description"
        />
      </Head>

      <Prose>
        <h1>Uses</h1>

        <p className="lead">
          Here is the tack stack that I use. As for hardware I use one item, my
          MacBook Pro (14-inch, 2021). Last update was on the 15th December,
          2022.
        </p>

        <h2>Current</h2>

        <ul>
          {usesCurrent.map((usesItem) => (
            <li key={usesItem}>{usesItem}</li>
          ))}
        </ul>

        <h2>Previous</h2>

        <ul>
          {usesPrevious.map((usesItem) => (
            <li key={usesItem}>{usesItem}</li>
          ))}
        </ul>
      </Prose>
    </>
  )
}
