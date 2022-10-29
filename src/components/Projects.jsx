import Project from './Project'

export default function Projects({ projectPosts, stacked }) {
  return (
    <ul
      className={`list-none p-0 ${
        stacked ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'
      }`}
    >
      {projectPosts.map((projectData) => (
        <Project
          key={projectData.slug}
          path={projectData.slug}
          title={projectData.title}
          description={projectData.description}
          role={projectData.role}
          tags={projectData.tags}
        />
      ))}
    </ul>
  )
}
