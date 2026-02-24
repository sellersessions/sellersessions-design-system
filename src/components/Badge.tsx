import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

type BadgeVariant = 'default' | 'purple' | 'accent' | 'gold' | 'success' | 'outline'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-ss-bg-hover text-ss-text',
  purple: 'bg-ss-purple/20 text-ss-purple-light border border-ss-purple/30',
  accent: 'bg-ss-accent/20 text-ss-accent border border-ss-accent/30',
  gold: 'bg-ss-gold/20 text-ss-gold border border-ss-gold/30',
  success: 'bg-green-500/20 text-green-400 border border-green-500/30',
  outline: 'bg-transparent text-ss-text border border-ss-border',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center rounded-full font-medium',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
