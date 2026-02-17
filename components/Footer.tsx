import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-400 mt-20">
      <div className="container-blog py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✒️</span>
              <span className="text-lg font-bold text-white">Inkwell</span>
            </Link>
            <p className="text-sm leading-relaxed">
              A modern blog platform powered by Cosmic. Beautiful content, beautifully delivered.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Powered By
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors"
                >
                  Cosmic
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors"
                >
                  Next.js
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-800 mt-8 pt-8 text-center">
          <p className="text-sm text-ink-500">
            &copy; {new Date().getFullYear()} Inkwell Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}