import { getPageBySlug, getAuthors } from '@/lib/cosmic'
import MarkdownContent from '@/components/MarkdownContent'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Inkwell Blog — our story, our mission, and the team behind the words.',
}

// Changed: Rebuilt about page with improved layout and markdown rendering
export default async function AboutPage() {
  const [page, authors] = await Promise.all([
    getPageBySlug('about'),
    getAuthors(),
  ])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-ink-950 text-white overflow-hidden">
        {page?.metadata?.hero_image && (
          <>
            <img
              src={`${page.metadata.hero_image.imgix_url}?w=1800&h=600&fit=crop&auto=format,compress`}
              alt={page.metadata?.heading || 'About'}
              width={1800}
              height={600}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 to-ink-950/40" />
          </>
        )}
        <div className="container-blog relative py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            {page?.metadata?.heading || 'About Inkwell'}
          </h1>
          {page?.metadata?.subheading && (
            <p className="text-lg sm:text-xl text-ink-300 max-w-2xl mx-auto">
              {page.metadata.subheading}
            </p>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container-blog py-12 sm:py-16">
        {/* Markdown Content from CMS */}
        {page?.metadata?.content ? (
          <section className="max-w-3xl mx-auto mb-16">
            <MarkdownContent content={page.metadata.content} />
          </section>
        ) : (
          <section className="max-w-3xl mx-auto mb-16 text-center py-12">
            <p className="text-6xl mb-4">📖</p>
            <h2 className="text-2xl font-bold text-ink-900 mb-2">About page content coming soon</h2>
            <p className="text-ink-500">
              Add an &ldquo;About&rdquo; page in your{' '}
              <a
                href="https://www.cosmicjs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Cosmic dashboard
              </a>{' '}
              to populate this page.
            </p>
          </section>
        )}

        {/* Team / Authors Section */}
        {authors.length > 0 && (
          <section className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-ink-900 mb-2">Meet the Team</h2>
              <p className="text-ink-500">The writers and creators behind Inkwell.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {authors.map((author) => (
                <Link
                  key={author.id}
                  href={`/authors/${author.slug}`}
                  className="group bg-white rounded-xl border border-ink-200 p-6 text-center hover:shadow-lg hover:border-accent/30 transition-all"
                >
                  {author.metadata?.avatar ? (
                    <img
                      src={`${author.metadata.avatar.imgix_url}?w=192&h=192&fit=crop&auto=format,compress`}
                      alt={author.metadata?.name || author.title}
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-2 ring-ink-100 group-hover:ring-accent/30 transition-all"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-ink-100 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl">✍️</span>
                    </div>
                  )}
                  <h3 className="font-bold text-ink-900 group-hover:text-accent transition-colors">
                    {author.metadata?.name || author.title}
                  </h3>
                  {author.metadata?.bio && (
                    <p className="text-sm text-ink-500 mt-2 line-clamp-3 leading-relaxed">
                      {author.metadata.bio}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}