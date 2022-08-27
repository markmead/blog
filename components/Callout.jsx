export default function Callout({ theme, text }) {
  let calloutEmoji = {
    base: '💡',
    error: '💀',
    success: '✅',
  }

  let calloutStyles = {
    error:
      'bg-rose-100 border-rose-200 text-rose-800 dark:bg-rose-600 dark:border-rose-700 dark:text-rose-50',
    success:
      'bg-emerald-100 border-emerald-200 text-emerald-800 dark:bg-emerald-600 dark:border-emerald-700 dark:text-emerald-50',
    base: 'bg-amber-100 border-amber-200 text-amber-800 dark:bg-amber-600 dark:border-amber-700 dark:text-amber-50',
  }

  let renderEmoji = theme ? calloutEmoji[theme] : calloutEmoji.base

  let renderColor = theme ? calloutStyles[theme] : calloutStyles.base

  return (
    <div className={`prose-callout flex rounded-lg border ${renderColor}`}>
      <span
        role="img"
        aria-hidden="true"
        className="p-3 select-none lg:text-xl"
      >
        {renderEmoji}
      </span>

      <div className="py-3 pr-3">
        <span className="text-sm tracking-wide">{text}</span>
      </div>
    </div>
  )
}
