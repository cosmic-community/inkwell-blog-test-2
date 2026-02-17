'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
  className?: string
}

// Changed: Rebuilt MarkdownContent with improved hydration handling and comprehensive element styling
export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!content) {
    return null
  }

  // Changed: Show skeleton loader during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-ink-100 rounded w-2/3" />
          <div className="h-4 bg-ink-100 rounded w-full" />
          <div className="h-4 bg-ink-100 rounded w-5/6" />
          <div className="h-4 bg-ink-100 rounded w-4/5" />
          <div className="h-6 bg-ink-100 rounded w-1/2 mt-8" />
          <div className="h-4 bg-ink-100 rounded w-full" />
          <div className="h-4 bg-ink-100 rounded w-3/4" />
        </div>
      </div>
    )
  }

  return (
    <div className={`markdown-content prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Changed: Explicit component overrides ensure proper class application
          h1: ({ children, ...props }) => (
            <h1
              {...props}
              className="text-3xl sm:text-4xl font-black text-ink-900 mt-8 mb-6 pb-3 border-b border-ink-200"
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              {...props}
              className="text-2xl sm:text-3xl font-bold text-ink-900 mt-10 mb-4 pb-2 border-b border-ink-200"
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              {...props}
              className="text-xl sm:text-2xl font-semibold text-ink-900 mt-8 mb-3"
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4
              {...props}
              className="text-lg sm:text-xl font-semibold text-ink-900 mt-6 mb-2"
            >
              {children}
            </h4>
          ),
          p: ({ children, ...props }) => (
            <p
              {...props}
              className="text-ink-700 leading-relaxed mb-4 text-base sm:text-lg"
            >
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul
              {...props}
              className="list-disc list-outside pl-6 space-y-2 mb-6 text-ink-700"
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol
              {...props}
              className="list-decimal list-outside pl-6 space-y-2 mb-6 text-ink-700"
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li
              {...props}
              className="text-ink-700 text-base sm:text-lg leading-relaxed"
            >
              {children}
            </li>
          ),
          strong: ({ children, ...props }) => (
            <strong {...props} className="font-semibold text-ink-900">
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em {...props} className="italic">
              {children}
            </em>
          ),
          a: ({ href, children, ...props }) => (
            <a
              {...props}
              href={href}
              className="text-accent hover:text-accent-dark underline transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-accent pl-4 italic text-ink-600 my-6"
            >
              {children}
            </blockquote>
          ),
          hr: ({ ...props }) => (
            <hr {...props} className="border-ink-200 my-8" />
          ),
          img: ({ src, alt, ...props }) => {
            const srcStr = typeof src === 'string' ? src : ''
            const optimizedSrc = srcStr && srcStr.includes('imgix.cosmicjs.com')
              ? `${srcStr}?w=1400&auto=format,compress`
              : srcStr
            return (
              <img
                {...props}
                src={optimizedSrc || ''}
                alt={alt || ''}
                className="rounded-lg shadow-md my-6"
                loading="lazy"
              />
            )
          },
          code: ({ children, className: codeClassName, ...props }) => {
            const isInline = !codeClassName
            if (isInline) {
              return (
                <code
                  {...props}
                  className="bg-ink-100 text-ink-800 px-1.5 py-0.5 rounded text-sm font-mono"
                >
                  {children}
                </code>
              )
            }
            return (
              <code {...props} className={codeClassName}>
                {children}
              </code>
            )
          },
          pre: ({ children, ...props }) => (
            <pre
              {...props}
              className="bg-ink-900 text-ink-200 rounded-lg p-4 overflow-x-auto my-6"
            >
              {children}
            </pre>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table {...props} className="w-full border-collapse">
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              {...props}
              className="border border-ink-200 px-4 py-2 bg-ink-50 text-left font-semibold text-ink-900"
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td {...props} className="border border-ink-200 px-4 py-2 text-ink-700">
              {children}
            </td>
          ),
        }}
      />
    </div>
  )
}