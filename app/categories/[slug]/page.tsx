// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPostsByCategoryId } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: category.metadata?.name || category.title,
    description: category.metadata?.description || `Posts in ${category.title}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategoryId(category.id)

  return (
    <div className="container-blog py-12 sm:py-16">
      <header className="mb-10">
        <Link
          href="/categories"
          className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-accent transition-colors mb-4"
        >
          ← All Categories
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-ink-900 mb-3">
          {category.metadata?.name || category.title}
        </h1>
        {category.metadata?.description && (
          <p className="text-lg text-ink-500 max-w-2xl">
            {category.metadata.description}
          </p>
        )}
        <p className="text-sm text-ink-400 mt-3">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">📭</p>
          <h2 className="text-xl font-bold text-ink-900 mb-2">No posts in this category</h2>
          <p className="text-ink-500">Check back soon for new content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}