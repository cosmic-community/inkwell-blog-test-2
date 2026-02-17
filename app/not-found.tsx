import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-blog py-24 text-center">
      <p className="text-8xl mb-6">🔍</p>
      <h1 className="text-4xl font-black text-ink-900 mb-3">Page Not Found</h1>
      <p className="text-lg text-ink-500 mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  )
}