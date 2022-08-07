export default function Callout({ theme, text }) {
  console.log(text)

  let emojiOptions = {
    base: '💡',
    error: '💀',
    success: '✅',
  }

  let calloutStyles = {
    base: 'bg-orange-50 border-orange-100 text-orange-800',
    error: 'bg-red-50 border-red-100 text-red-800',
    success: 'bg-green-50 border-green-100 text-green-800',
  }

  let renderEmoji = theme ? emojiOptions[theme] : emojiOptions.base

  let renderColor = theme ? calloutStyles[theme] : calloutStyles.base

  return (
    <>
      <div className={`flex rounded-lg border ${renderColor}`}>
        <span className="p-3 select-none lg:text-xl" role="img">
          {renderEmoji}
        </span>

        <div className="py-3 pr-3">{text}</div>
      </div>
    </>
  )
}
