// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import MarkdownContent from '@/components/MarkdownContent'
import CategoryBadge from '@/components/CategoryBadge'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.metadata?.title || post.title,
    description: post.metadata?.content
      ? post.metadata.content.replace(/[#*_`>\-\[\]()]/g, '').slice(0, 160)
      : undefined,
  }
}

// Changed: Rebuilt post page with improved markdown content rendering
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const image = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article>
      {/* Hero Image */}
      {image && (
        <div className="relative aspect-[3/1] max-h-[480px] overflow-hidden bg-ink-900">
          <img
            src={`${image.imgix_url}?w=1800&h=600&fit=crop&auto=format,compress`}
            alt={post.title}
            width={1800}
            height={600}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
        </div>
      )}

      <div className="container-blog">
        {/* Post Header */}
        <header className={`max-w-3xl mx-auto ${image ? '-mt-24 relative z-10' : 'pt-12'}`}>
          <div className={`${image ? 'bg-white rounded-2xl shadow-xl p-8 sm:p-10' : ''}`}>
            {category && (
              <div className="mb-4">
                <CategoryBadge category={category} size="md" />
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-900 leading-tight mb-6">
              {post.metadata?.title || post.title}
            </h1>

            <div className="flex items-center gap-4 pb-6 border-b border-ink-200">
              {author && (
                <Link
                  href={`/authors/${author.slug}`}
                  className="flex items-center gap-3 group"
                >
                  {author.metadata?.avatar && (
                    <img
                      src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={author.metadata?.name || author.title}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-ink-100 group-hover:ring-accent/30 transition-all"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-ink-900 group-hover:text-accent transition-colors">
                      {author.metadata?.name || author.title}
                    </p>
                    {date && (
                      <time className="text-sm text-ink-500">{date}</time>
                    )}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Post Content — Changed: Using MarkdownContent component for proper rendering */}
        <div className="max-w-3xl mx-auto py-10 sm:py-12">
          {post.metadata?.content ? (
            <MarkdownContent content={post.metadata.content} />
          ) : (
            <p className="text-ink-500 text-center italic">No content available for this post.</p>
          )}
        </div>

        {/* Author Bio */}
        {author && (
          <div className="max-w-3xl mx-auto pb-12">
            <div className="rounded-xl bg-ink-50 border border-ink-200 p-6 sm:p-8">
              <Link
                href={`/authors/${author.slug}`}
                className="flex items-start gap-4 group"
              >
                {author.metadata?.avatar && (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                    alt={author.metadata?.name || author.title}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-ink-200 group-hover:ring-accent/30 transition-all flex-shrink-0"
                  />
                )}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-1">
                    Written by
                  </p>
                  <p className="font-bold text-ink-900 group-hover:text-accent transition-colors">
                    {author.metadata?.name || author.title}
                  </p>
                  {author.metadata?.bio && (
                    <p className="text-sm text-ink-600 mt-1 leading-relaxed">
                      {author.metadata.bio}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}