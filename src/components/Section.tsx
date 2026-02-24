import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddings = {
  none: '',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, as: Component = 'section', padding = 'lg', children, ...props }, ref) => {
    return (
      <Component
        // @ts-expect-error - ref type mismatch with dynamic component
        ref={ref}
        className={clsx(paddings[padding], className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Section.displayName = 'Section'
