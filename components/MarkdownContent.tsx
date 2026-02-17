'use client'

import { useEffect, useState, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
  className?: string
}

// Changed: Added explicit prop types for all component overrides to fix TS7031 errors
interface ChildrenProps {
  children?: ReactNode
  [key: string]: unknown
}

interface AnchorProps {
  href?: string
  children?: ReactNode
  [key: string]: unknown
}

interface ImageProps {
  src?: string
  alt?: string
  [key: string]: unknown
}

interface CodeProps {
  children?: ReactNode
  className?: string
  [key: string]: unknown
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
          h1: ({ children, ...props }: ChildrenProps) => (
            <h1
              {...props}
              className="text-3xl sm:text-4xl font-black text-ink-900 mt-8 mb-6 pb-3 border-b border-ink-200"
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }: ChildrenProps) => (
            <h2
              {...props}
              className="text-2xl sm:text-3xl font-bold text-ink-900 mt-10 mb-4 pb-2 border-b border-ink-200"
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }: ChildrenProps) => (
            <h3
              {...props}
              className="text-xl sm:text-2xl font-semibold text-ink-900 mt-8 mb-3"
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }: ChildrenProps) => (
            <h4
              {...props}
              className="text-lg sm:text-xl font-semibold text-ink-900 mt-6 mb-2"
            >
              {children}
            </h4>
          ),
          p: ({ children, ...props }: ChildrenProps) => (
            <p
              {...props}
              className="text-ink-700 leading-relaxed mb-4 text-base sm:text-lg"
            >
              {children}
            </p>
          ),
          ul: ({ children, ...props }: ChildrenProps) => (
            <ul
              {...props}
              className="list-disc list-outside pl-6 space-y-2 mb-6 text-ink-700"
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }: ChildrenProps) => (
            <ol
              {...props}
              className="list-decimal list-outside pl-6 space-y-2 mb-6 text-ink-700"
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }: ChildrenProps) => (
            <li
              {...props}
              className="text-ink-700 text-base sm:text-lg leading-relaxed"
            >
              {children}
            </li>
          ),
          strong: ({ children, ...props }: ChildrenProps) => (
            <strong {...props} className="font-semibold text-ink-900">
              {children}
            </strong>
          ),
          em: ({ children, ...props }: ChildrenProps) => (
            <em {...props} className="italic">
              {children}
            </em>
          ),
          a: ({ href, children, ...props }: AnchorProps) => (
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
          blockquote: ({ children, ...props }: ChildrenProps) => (
            <blockquote
              {...props}
              className="border-l-4 border-accent pl-4 italic text-ink-600 my-6"
            >
              {children}
            </blockquote>
          ),
          hr: ({ ...props }: Record<string, unknown>) => (
            <hr {...props} className="border-ink-200 my-8" />
          ),
          img: ({ src, alt, ...props }: ImageProps) => {
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
          code: ({ children, className: codeClassName, ...props }: CodeProps) => {
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
          pre: ({ children, ...props }: ChildrenProps) => (
            <pre
              {...props}
              className="bg-ink-900 text-ink-200 rounded-lg p-4 overflow-x-auto my-6"
            >
              {children}
            </pre>
          ),
          table: ({ children, ...props }: ChildrenProps) => (
            <div className="overflow-x-auto my-6">
              <table {...props} className="w-full border-collapse">
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }: ChildrenProps) => (
            <th
              {...props}
              className="border border-ink-200 px-4 py-2 bg-ink-50 text-left font-semibold text-ink-900"
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }: ChildrenProps) => (
            <td {...props} className="border border-ink-200 px-4 py-2 text-ink-700">
              {children}
            </td>
          ),
        }}
      />
    </div>
  )
}