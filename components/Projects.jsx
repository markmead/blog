import Project from './Project'

export default function Projects({ projects, stacked }) {
  return (
    <ul
      className={`list-none p-0 ${
        stacked ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'
      }`}
    >
      {projects.map(({ filePath, data }) => (
        <Project
          key={filePath}
          path={filePath}
          title={data.title}
          description={data.description}
          role={data.role}
          tags={data.tags}
        />
      ))}
    </ul>
  )
}
