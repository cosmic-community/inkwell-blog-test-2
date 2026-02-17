export default function Loading() {
  return (
    <div className="container-blog py-16">
      {/* Hero skeleton */}
      <div className="animate-pulse mb-12">
        <div className="rounded-2xl bg-ink-200 aspect-[2/1] w-full" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border border-ink-200 overflow-hidden">
            <div className="bg-ink-200 aspect-[16/10]" />
            <div className="p-6 space-y-3">
              <div className="bg-ink-200 h-4 w-20 rounded-full" />
              <div className="bg-ink-200 h-6 w-3/4 rounded" />
              <div className="bg-ink-200 h-4 w-full rounded" />
              <div className="bg-ink-200 h-4 w-2/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}