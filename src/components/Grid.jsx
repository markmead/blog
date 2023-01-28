import Card from '@/components/Card'

export default function Grid({ items, stacked = false, project = false }) {
  return (
    <ul
      className={`p-0 list-none ${
        stacked ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'
      }`}
    >
      {items.map((item) => (
        <Card key={item.slug} post={item} project={project} />
      ))}
    </ul>
  )
}
