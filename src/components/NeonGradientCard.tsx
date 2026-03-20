import { ReactNode } from 'react'

interface NeonGradientCardProps {
  children: ReactNode
  color?: string
  intensity?: 'subtle' | 'strong'
  className?: string
}

export function NeonGradientCard({
  children,
  color = '#753EF7',
  intensity = 'strong',
  className = '',
}: NeonGradientCardProps) {
  const speed = intensity === 'strong' ? '3s' : '5s'
  const glowOpacity = intensity === 'strong' ? 0.4 : 0.2
  const pulseOpacity = intensity === 'strong' ? 0.3 : 0.15

  return (
    <div
      className={`neon-gradient-card ${className}`}
      style={{
        '--neon-color': color,
        '--neon-speed': speed,
        '--neon-glow-opacity': glowOpacity,
        '--neon-pulse-opacity': pulseOpacity,
      } as React.CSSProperties}
    >
      <div className="neon-gradient-card-content">
        {children}
      </div>
    </div>
  )
}
