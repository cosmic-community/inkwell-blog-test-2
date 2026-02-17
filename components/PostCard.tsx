import Link from 'next/link'
import type { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
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

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl bg-ink-950 shadow-xl">
        <Link href={`/posts/${post.slug}`} className="block">
          {image && (
            <div className="aspect-[2/1] overflow-hidden">
              <img
                src={`${image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
              />
            </div>
          )}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
            {category && (
              <div className="mb-3" onClick={(e) => e.stopPropagation()}>
                <CategoryBadge category={category} size="md" />
              </div>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 group-hover:text-accent-light transition-colors">
              {post.metadata?.title || post.title}
            </h2>
            <div className="flex items-center gap-3 text-ink-300">
              {author?.metadata?.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20"
                />
              )}
              {author && (
                <span className="text-sm font-medium text-white/80">
                  {author.metadata?.name || author.title}
                </span>
              )}
              {date && (
                <>
                  <span className="text-ink-500">·</span>
                  <time className="text-sm text-white/60">{date}</time>
                </>
              )}
            </div>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className="group rounded-xl overflow-hidden border border-ink-200 bg-white hover:shadow-lg hover:border-ink-300 transition-all duration-300">
      <Link href={`/posts/${post.slug}`} className="block">
        {image && (
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={post.title}
              width={800}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
      </Link>
      <div className="p-5 sm:p-6">
        {category && (
          <div className="mb-3">
            <CategoryBadge category={category} />
          </div>
        )}
        <Link href={`/posts/${post.slug}`} className="block group/title">
          <h2 className="text-lg sm:text-xl font-bold text-ink-900 group-hover/title:text-accent transition-colors mb-2 line-clamp-2">
            {post.metadata?.title || post.title}
          </h2>
        </Link>
        {post.metadata?.content && (
          <p className="text-ink-600 text-sm leading-relaxed line-clamp-2 mb-4">
            {post.metadata.content.replace(/[#*_`>\-\[\]()]/g, '').slice(0, 160)}...
          </p>
        )}
        <div className="flex items-center gap-3 pt-3 border-t border-ink-100">
          {author?.metadata?.avatar && (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
              alt={author.metadata?.name || author.title}
              width={24}
              height={24}
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="text-sm font-medium text-ink-700 hover:text-accent transition-colors"
            >
              {author.metadata?.name || author.title}
            </Link>
          )}
          {date && (
            <>
              <span className="text-ink-300">·</span>
              <time className="text-sm text-ink-500">{date}</time>
            </>
          )}
        </div>
      </div>
    </article>
  )
}