export default function Callout({ theme, text }) {
  let emojiOptions = {
    base: '💡',
    error: '💀',
    success: '✅',
  }

  let calloutStyles = {
    error: 'bg-red-50 border-red-100 text-red-800',
    success: 'bg-green-50 border-green-100 text-green-800',
    base: 'bg-orange-50 border-orange-100 text-orange-800',
  }

  let renderEmoji = theme ? emojiOptions[theme] : emojiOptions.base

  let renderColor = theme ? calloutStyles[theme] : calloutStyles.base

  return (
    <>
      <div className={`flex rounded-lg border ${renderColor}`}>
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
    </>
  )
}
