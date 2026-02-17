'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt, ...props }) => {
            const srcStr = typeof src === 'string' ? src : '' // Changed: narrow src to string to fix TS2339
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
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
        }}
      />
    </div>
  )
}