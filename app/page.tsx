import { getPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-ink-950 text-white py-16 sm:py-20">
        <div className="container-blog text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Stories Worth <span className="text-accent-light">Reading</span>
          </h1>
          <p className="text-lg sm:text-xl text-ink-400 max-w-2xl mx-auto">
            Discover fresh perspectives on technology, travel, and everything in between.
          </p>
        </div>
      </section>

      {/* Categories Bar */}
      {categories.length > 0 && (
        <section className="border-b border-ink-200 bg-white">
          <div className="container-blog py-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-ink-500">Browse:</span>
              {categories.map((category) => (
                <CategoryBadge key={category.id} category={category} size="md" />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container-blog py-12 sm:py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">📝</p>
            <h2 className="text-2xl font-bold text-ink-900 mb-2">No posts yet</h2>
            <p className="text-ink-500">
              Add some posts in your{' '}
              <a
                href="https://www.cosmicjs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Cosmic dashboard
              </a>{' '}
              to get started.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <section className="mb-12 sm:mb-16">
                <PostCard post={featuredPost} featured />
              </section>
            )}

            {/* Post Grid */}
            {remainingPosts.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-ink-900">Latest Posts</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {remainingPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}