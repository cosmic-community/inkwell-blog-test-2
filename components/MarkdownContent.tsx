'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) {
    return null
  }

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
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
                className="rounded-lg shadow-md"
                loading="lazy"
              />
            )
          },
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
        }}
      />
    </div>
  )
}