// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthorBySlug, getPostsByAuthorId } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import type { Metadata } from 'next'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return { title: 'Author Not Found' }
  }

  return {
    title: author.metadata?.name || author.title,
    description: author.metadata?.bio || `Posts by ${author.title}`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthorId(author.id)
  const avatar = author.metadata?.avatar

  return (
    <div className="container-blog py-12 sm:py-16">
      {/* Author Profile */}
      <header className="max-w-3xl mx-auto text-center mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-accent transition-colors mb-6"
        >
          ← Back to Home
        </Link>
        {avatar && (
          <img
            src={`${avatar.imgix_url}?w=192&h=192&fit=crop&auto=format,compress`}
            alt={author.metadata?.name || author.title}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-ink-200 mx-auto mb-5"
          />
        )}
        <h1 className="text-3xl sm:text-4xl font-black text-ink-900 mb-3">
          {author.metadata?.name || author.title}
        </h1>
        {author.metadata?.bio && (
          <p className="text-lg text-ink-500 max-w-xl mx-auto leading-relaxed">
            {author.metadata.bio}
          </p>
        )}
        <p className="text-sm text-ink-400 mt-4">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
        </p>
      </header>

      {/* Author's Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">📝</p>
          <h2 className="text-xl font-bold text-ink-900 mb-2">No posts yet</h2>
          <p className="text-ink-500">This author hasn&apos;t published any posts yet.</p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-ink-900 mb-8">
            Posts by {author.metadata?.name || author.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}