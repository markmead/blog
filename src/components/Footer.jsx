export default function Footer() {
  function handleVersion(targetUrl) {
    window.location = targetUrl
  }

  return (
    <footer className="pt-4 border-t border-black">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs">{new Date().getFullYear()} Mark Mead.</p>

        <div className="flex items-center gap-4">
          <label htmlFor="WebsiteVersion" className="font-mono text-xs">
            Website Version
          </label>

          <select
            id="WebsiteVersion"
            onChange={(e) => handleVersion(e.target.value)}
            className="text-sm border-black"
          >
            <option>Latest</option>
            <option value="https://v2.markmead.dev/">v2</option>
            <option value="https://v1.markmead.dev/">v1</option>
          </select>
        </div>
      </div>
    </footer>
  )
}
