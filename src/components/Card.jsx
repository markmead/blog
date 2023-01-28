import Link from 'next/link'

export default function Card({ post, project = false }) {
  const type = project ? 'projects' : 'blog'
  const footer = project ? post.role : post.date

  const link = {
    as: `/${type}/${post.slug}`,
    href: `/${type}/[slug]`,
  }

  return (
    <li className="p-0 m-0">
      <Link as={link.as} href={link.href}>
        <a className="block p-4 m-0 no-underline border-4 border-black bg-white text-black hover:invert">
          <h3 className="m-0">{post.title}</h3>

          <div className="font-normal">
            <p>{post.description}</p>

            <small className="flex gap-2">
              {project ? <span>{footer}</span> : <time>{footer}</time>}

              <span>&middot;</span>

              <span>{post.tags.join(', ')}</span>
            </small>
          </div>
        </a>
      </Link>
    </li>
  )
}
