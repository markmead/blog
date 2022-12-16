import Link from 'next/link'

export default function Card({ postItem, isProject = false }) {
  const postType = isProject ? 'projects' : 'blog'
  const postFooter = isProject ? postItem.role : postItem.date

  const linkAs = `/${postType}/${postItem.slug}`
  const linkHref = `/${postType}/[slug]`

  return (
    <li className="p-0 m-0">
      <Link as={linkAs} href={linkHref}>
        <a className="block p-4 m-0 no-underline bg-white border border-black hover:invert">
          <h3 className="m-0">{postItem.title}</h3>

          <div className="font-normal">
            <p>{postItem.description}</p>

            <small className="flex gap-2">
              {isProject ? (
                <span>{postFooter}</span>
              ) : (
                <time>{postFooter}</time>
              )}

              <span>&middot;</span>

              <span>{postItem.tags.join(', ')}</span>
            </small>
          </div>
        </a>
      </Link>
    </li>
  )
}
