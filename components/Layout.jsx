export default function Layout({ children }) {
  return (
    <main className="relative">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </div>
    </main>
  )
}
