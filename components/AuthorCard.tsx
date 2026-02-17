import Link from 'next/link'
import type { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const avatar = author.metadata?.avatar

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group flex items-center gap-4 p-4 rounded-xl border border-ink-200 hover:border-ink-300 hover:shadow-md bg-white transition-all duration-300"
    >
      {avatar && (
        <img
          src={`${avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
          alt={author.metadata?.name || author.title}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-ink-100 group-hover:ring-accent/30 transition-all"
        />
      )}
      <div className="min-w-0">
        <h3 className="font-semibold text-ink-900 group-hover:text-accent transition-colors truncate">
          {author.metadata?.name || author.title}
        </h3>
        {author.metadata?.bio && (
          <p className="text-sm text-ink-500 line-clamp-1 mt-0.5">
            {author.metadata.bio}
          </p>
        )}
      </div>
    </Link>
  )
}