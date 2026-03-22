import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'cta' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  isLoading?: boolean
  href?: string
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ss-purple text-white hover:bg-ss-purple-light shadow-glow',
  secondary: 'bg-ss-bg-card text-ss-text border border-ss-border hover:border-ss-purple hover:bg-ss-bg-hover',
  cta: 'bg-ss-accent text-white hover:bg-ss-accent-dark shadow-glow-accent',
  outline: 'bg-transparent text-ss-text border-2 border-ss-purple hover:bg-ss-purple hover:border-ss-purple',
  ghost: 'bg-transparent text-ss-text hover:bg-ss-bg-hover',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    leftIcon,
    rightIcon,
    isLoading,
    disabled,
    children,
    href,
    ...props
  }, ref) => {
    const classes = clsx(
      'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300',
      'focus:outline-none focus:ring-2 focus:ring-ss-purple focus:ring-offset-2 focus:ring-offset-ss-bg',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variants[variant],
      sizes[size],
      className
    )

    if (href) {
      return (
        <a
          href={isLoading ? undefined : href}
          className={clsx(classes, isLoading && 'opacity-70 pointer-events-none')}
          onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : leftIcon}
          {children}
          {!isLoading && rightIcon}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
