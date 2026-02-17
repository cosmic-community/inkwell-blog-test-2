// Changed: Added type declarations for react-markdown to fix TS2307 module resolution
declare module 'react-markdown' {
  import { ReactNode, ComponentType } from 'react'

  interface ReactMarkdownProps {
    children?: string
    remarkPlugins?: Array<unknown>
    rehypePlugins?: Array<unknown>
    components?: Record<string, ComponentType<Record<string, unknown>>>
    className?: string
    [key: string]: unknown
  }

  const ReactMarkdown: ComponentType<ReactMarkdownProps>
  export default ReactMarkdown
}