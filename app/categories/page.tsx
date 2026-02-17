import Link from 'next/link'
import { getCategories } from '@/lib/cosmic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all blog categories',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container-blog py-12 sm:py-16">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-ink-900 mb-3">
            Categories
          </h1>
          <p className="text-lg text-ink-500">
            Browse posts by topic to find exactly what you&apos;re looking for.
          </p>
        </header>

        {categories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🏷️</p>
            <p className="text-ink-500">No categories yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group p-6 rounded-xl border border-ink-200 bg-white hover:border-accent/40 hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-ink-900 group-hover:text-accent transition-colors mb-2">
                  {category.metadata?.name || category.title}
                </h2>
                {category.metadata?.description && (
                  <p className="text-sm text-ink-500 leading-relaxed">
                    {category.metadata.description}
                  </p>
                )}
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-4 group-hover:gap-2 transition-all">
                  View posts →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}