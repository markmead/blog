export default function Layout({ children }) {
  return (
    <>
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-12">{children}</div>
      </main>
    </>
  )
}
