export default function Footer() {
  function handleVersion(targetUrl) {
    window.location = targetUrl
  }

  return (
    <footer className="p-4 text-center border border-slate-100 bg-slate-50 rounded-xl dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {new Date().getFullYear()} Mark Mead.
        </p>

        <div>
          <label htmlFor="WebsiteVersion" class="sr-only">
            Website Version
          </label>

          <select
            id="WebsiteVersion"
            onChange={(e) => handleVersion(e.target.value)}
            className="text-sm rounded-lg bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-200"
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
