import { HTMLAttributes, forwardRef, useRef, useCallback } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  glow?: boolean
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, padding = 'md', glow = true, children, onMouseMove, ...props }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      const el = innerRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      }
      onMouseMove?.(e)
    }, [onMouseMove])

    return (
      <div
        ref={(node) => {
          (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        className={clsx(
          'glow-card',
          paddings[padding],
          hover && 'glow-card-hover',
          className
        )}
        onMouseMove={glow ? handleMouseMove : undefined}
        {...props}
      >
        <div className="glow-card-content">
          {children}
        </div>
      </div>
    )
  }
)

Card.displayName = 'Card'
