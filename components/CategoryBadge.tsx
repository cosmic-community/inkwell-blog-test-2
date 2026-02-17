import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const sizeClasses = size === 'sm'
    ? 'text-xs px-2.5 py-0.5'
    : 'text-sm px-3 py-1'

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-flex items-center rounded-full font-medium bg-accent/10 text-accent hover:bg-accent/20 transition-colors ${sizeClasses}`}
    >
      {category.metadata?.name || category.title}
    </Link>
  )
}