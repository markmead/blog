import { usesCurrent, usesPrevious } from '@/data/usesPage'

export default function Uses() {
  return (
    <article className="prose max-w-none prose-slate dark:prose-invert">
      <h1>Uses</h1>

      <p className="lead">
        Here is the tack stack that I use. As for hardware I use one item, my
        MacBook Pro (14-inch, 2021). Last update was on the 30th October, 2022.
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
    </article>
  )
}
