import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-ink-950 text-white sticky top-0 z-40">
      <div className="container-blog">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">✒️</span>
            <span className="text-xl font-bold tracking-tight group-hover:text-accent-light transition-colors">
              Inkwell
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-ink-300 hover:text-white rounded-md hover:bg-ink-800 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="px-3 py-2 text-sm font-medium text-ink-300 hover:text-white rounded-md hover:bg-ink-800 transition-colors"
            >
              Categories
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}