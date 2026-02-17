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
            const optimizedSrc = src && src.includes('imgix.cosmicjs.com')
              ? `${src}?w=1400&auto=format,compress`
              : src
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