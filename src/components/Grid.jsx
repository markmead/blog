import Card from '@/components/Card'

export default function Grid({
  gridItems,
  isStacked = false,
  isProject = false,
}) {
  return (
    <ul
      className={`p-0 list-none ${
        isStacked ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'
      }`}
    >
      {gridItems.map((gridItem) => (
        <Card key={gridItem.slug} postItem={gridItem} isProject={isProject} />
      ))}
    </ul>
  )
}
