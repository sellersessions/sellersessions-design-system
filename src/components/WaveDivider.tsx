interface WaveDividerProps {
  color?: string
  className?: string
}

export function WaveDivider({ color = '#753EF7', className = '' }: WaveDividerProps) {
  return (
    <div className={`wave-divider-wrap ${className}`} aria-hidden="true">
      <svg
        className="wave-divider-svg"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,30 C240,10 480,50 720,30 C960,10 1200,50 1440,30"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.2"
        />
        <path
          d="M0,35 C240,15 480,55 720,35 C960,15 1200,55 1440,35"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.1"
        />
      </svg>
    </div>
  )
}
