'use client'

interface StopPropagationProps {
  className?: string
  children: React.ReactNode
}

export default function StopPropagation({ className, children }: StopPropagationProps) {
  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  )
}