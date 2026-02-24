# WordPress Page Builder - Seller Sessions Edition

Build WordPress-compatible pages using React with the Seller Sessions design system. Export as static bundles for WordPress Custom HTML blocks.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| clsx | Conditional class names |

---

## Seller Sessions Design System

### Brand Colors

```
Primary Purple:    #2F0453  (Deep purple - main brand color)
Primary Light:     #4A1A6B  (Lighter purple for hover states)
Accent Orange:     #F97316  (Call-to-action highlights)
Accent Gold:       #FBBF24  (Premium/VIP elements)

Background Dark:   #0A0A0A  (Main dark background)
Background Card:   #1A1A1A  (Card/section backgrounds)
Background Hover:  #252525  (Interactive hover states)

Text Primary:      #FAFAFC  (Main text on dark)
Text Secondary:    #D2D2D2  (Muted text)
Text Tertiary:     #9CA3AF  (Subtle text/captions)

Border:            #333333  (Subtle borders)
Border Accent:     #4A1A6B  (Purple accent borders)

Success:           #22C55E  (Green for success states)
Error:             #EF4444  (Red for errors)
Warning:           #FBBF24  (Yellow for warnings)
```

### Typography

```
Font Family:       'Inter', 'Poppins', system-ui, sans-serif
Headings:          'Poppins', 'Inter', sans-serif (weight: 600-700)
Body:              'Inter', system-ui, sans-serif (weight: 400)

Font Sizes:
- Hero:            4rem / 64px (mobile: 2.5rem)
- H1:              3rem / 48px (mobile: 2rem)
- H2:              2.25rem / 36px (mobile: 1.75rem)
- H3:              1.5rem / 24px
- H4:              1.25rem / 20px
- Body:            1rem / 16px
- Small:           0.875rem / 14px
- Caption:         0.75rem / 12px
```

### Spacing Scale

```
--space-1:   0.25rem  (4px)
--space-2:   0.5rem   (8px)
--space-3:   0.75rem  (12px)
--space-4:   1rem     (16px)
--space-5:   1.25rem  (20px)
--space-6:   1.5rem   (24px)
--space-8:   2rem     (32px)
--space-10:  2.5rem   (40px)
--space-12:  3rem     (48px)
--space-16:  4rem     (64px)
--space-20:  5rem     (80px)
--space-24:  6rem     (96px)
```

### Border Radius

```
--radius-sm:   0.375rem  (6px)
--radius-md:   0.5rem    (8px)
--radius-lg:   0.75rem   (12px)
--radius-xl:   1rem      (16px)
--radius-2xl:  1.5rem    (24px)
--radius-full: 9999px    (Pills/circles)
```

### Shadows

```
--shadow-sm:   0 1px 2px rgba(0, 0, 0, 0.5)
--shadow-md:   0 4px 6px rgba(0, 0, 0, 0.4)
--shadow-lg:   0 10px 15px rgba(0, 0, 0, 0.3)
--shadow-xl:   0 20px 25px rgba(0, 0, 0, 0.25)
--shadow-glow: 0 0 20px rgba(47, 4, 83, 0.5)  (Purple glow)
```

---

## Project Structure

```
wordpress-page-builder/
├── src/
│   ├── App.tsx              # BUILD PAGES HERE
│   ├── main.tsx             # React entry point
│   ├── index.css            # Global styles & CSS variables
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   ├── Badge.tsx
│   │   ├── Hero.tsx
│   │   ├── EventCard.tsx
│   │   ├── PodcastPlayer.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── CTASection.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   └── theme/
│       ├── colors.ts        # Color tokens
│       ├── typography.ts    # Font configuration
│       └── index.ts
├── scripts/
│   └── generate-embed.js    # WordPress embed generator
├── public/
│   └── fonts/               # Self-hosted fonts (optional)
├── dist/                    # Built files (after build)
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
└── CLAUDE.md
```

---

## Quick Start

### 1. Initialize Project

```bash
npm create vite@latest wordpress-page-builder -- --template react-ts
cd wordpress-page-builder
```

### 2. Install Dependencies

```bash
npm install framer-motion lucide-react clsx
npm install -D tailwindcss postcss autoprefixer @types/node
npx tailwindcss init -p
```

### 3. Copy Configuration Files

Copy all configuration files from this guide into your project.

### 4. Development

```bash
npm run dev        # Start dev server at localhost:5173
npm run build:wp   # Build for WordPress
```

---

## Configuration Files

### package.json

```json
{
  "name": "sellersessions-page-builder",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "build:wp": "tsc && vite build && node scripts/generate-embed.js"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^22.10.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.16",
    "typescript": "^5.6.3",
    "vite": "^6.0.3"
  }
}
```

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    watch: {
      ignored: ['**/wordpress/**', '**/scripts/**']
    }
  },
  build: {
    outDir: 'dist',
    cssCodeSplit: false,  // Keep all CSS in one file
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    assetsInlineLimit: 4096,
  }
})
```

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        'ss-purple': {
          DEFAULT: '#2F0453',
          light: '#4A1A6B',
          dark: '#1A0230',
        },
        'ss-orange': {
          DEFAULT: '#F97316',
          light: '#FB923C',
          dark: '#EA580C',
        },
        'ss-gold': {
          DEFAULT: '#FBBF24',
          light: '#FCD34D',
          dark: '#F59E0B',
        },
        // Background colors
        'ss-bg': {
          DEFAULT: '#0A0A0A',
          card: '#1A1A1A',
          hover: '#252525',
        },
        // Text colors
        'ss-text': {
          DEFAULT: '#FAFAFC',
          secondary: '#D2D2D2',
          tertiary: '#9CA3AF',
        },
        // Border colors
        'ss-border': {
          DEFAULT: '#333333',
          accent: '#4A1A6B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', fontWeight: '700' }],
        'hero-mobile': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(47, 4, 83, 0.5)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.4)',
        'card': '0 4px 6px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(47, 4, 83, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(47, 4, 83, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
```

### postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### tsconfig.node.json

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Seller Sessions Page Builder</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## Source Files

### src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Seller Sessions Custom Base Styles */
@layer base {
  :root {
    /* Colors */
    --ss-purple: #2F0453;
    --ss-purple-light: #4A1A6B;
    --ss-purple-dark: #1A0230;
    --ss-orange: #F97316;
    --ss-gold: #FBBF24;
    --ss-bg: #0A0A0A;
    --ss-bg-card: #1A1A1A;
    --ss-bg-hover: #252525;
    --ss-text: #FAFAFC;
    --ss-text-secondary: #D2D2D2;
    --ss-text-tertiary: #9CA3AF;
    --ss-border: #333333;

    /* Spacing */
    --container-padding: 1rem;
    --section-padding: 4rem;
  }

  @media (min-width: 768px) {
    :root {
      --container-padding: 2rem;
      --section-padding: 6rem;
    }
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-ss-bg text-ss-text font-sans antialiased;
    min-height: 100vh;
  }

  /* Typography defaults */
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading font-bold text-ss-text;
  }

  a {
    @apply text-ss-orange hover:text-ss-orange-light transition-colors;
  }

  /* WordPress compatibility - scope styles */
  #root {
    @apply bg-ss-bg min-h-screen;
  }
}

@layer components {
  /* Button base styles */
  .btn {
    @apply inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300;
  }

  .btn-primary {
    @apply bg-ss-purple text-white hover:bg-ss-purple-light shadow-glow hover:shadow-lg;
  }

  .btn-secondary {
    @apply bg-ss-bg-card text-ss-text border border-ss-border hover:border-ss-purple hover:bg-ss-bg-hover;
  }

  .btn-cta {
    @apply bg-ss-orange text-white hover:bg-ss-orange-dark shadow-glow-orange hover:shadow-lg;
  }

  .btn-outline {
    @apply bg-transparent text-ss-text border-2 border-ss-purple hover:bg-ss-purple hover:border-ss-purple;
  }

  /* Card styles */
  .card {
    @apply bg-ss-bg-card rounded-xl border border-ss-border p-6 shadow-card transition-all duration-300;
  }

  .card-hover {
    @apply hover:border-ss-purple hover:shadow-glow hover:-translate-y-1;
  }

  /* Section styles */
  .section {
    @apply py-16 md:py-24 px-4 md:px-8;
  }

  .section-dark {
    @apply bg-ss-bg;
  }

  .section-card {
    @apply bg-ss-bg-card;
  }

  /* Container */
  .container-custom {
    @apply max-w-7xl mx-auto px-4 md:px-8;
  }

  /* Gradient backgrounds */
  .gradient-purple {
    background: linear-gradient(135deg, var(--ss-purple) 0%, var(--ss-purple-light) 100%);
  }

  .gradient-hero {
    background: linear-gradient(180deg, var(--ss-purple-dark) 0%, var(--ss-bg) 100%);
  }

  /* Text gradients */
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-ss-purple-light to-ss-orange;
  }
}

@layer utilities {
  /* Hide scrollbar utility */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Glass effect */
  .glass {
    @apply bg-ss-bg-card/80 backdrop-blur-md;
  }
}
```

### src/main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### src/App.tsx

```tsx
/**
 * Seller Sessions Page Builder
 *
 * BUILD YOUR PAGES HERE
 *
 * This is the main entry point for creating WordPress pages.
 * Import components from ./components and compose your page layout.
 */

import { motion } from 'framer-motion'
import {
  Button,
  Container,
  Section,
  Card,
  Hero,
  EventCard,
  FeatureGrid,
  CTASection,
  Badge
} from './components'
import { Calendar, Mic, Users, Zap, Star, ArrowRight } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-ss-bg">
      {/* Hero Section */}
      <Hero
        title="Seller Sessions Live 2026"
        subtitle="Built for Innovators. Not Imitators."
        description="Join 500+ Amazon sellers for 2 days of cutting-edge strategies, networking, and actionable insights in London."
        primaryCTA={{ label: "Get Tickets", href: "#tickets" }}
        secondaryCTA={{ label: "Learn More", href: "#about" }}
        badge="March 15-16, 2026 • London"
      />

      {/* Features Section */}
      <Section className="section-dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="purple" className="mb-4">Why Attend</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="text-gradient">Scale Your Business</span>
            </h2>
            <p className="text-ss-text-secondary max-w-2xl mx-auto">
              Two days packed with actionable strategies from industry leaders.
            </p>
          </motion.div>

          <FeatureGrid
            features={[
              {
                icon: <Mic className="w-8 h-8" />,
                title: "20+ Expert Speakers",
                description: "Learn from the brightest minds in Amazon selling"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "500+ Attendees",
                description: "Network with successful sellers from around the world"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Cutting-Edge Tactics",
                description: "Discover strategies before they become mainstream"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "VIP Experience",
                description: "Exclusive dinner and networking with speakers"
              }
            ]}
          />
        </Container>
      </Section>

      {/* Events Section */}
      <Section className="section-card">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="orange" className="mb-4">Upcoming Events</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Don't Miss Out
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <EventCard
              title="Seller Sessions Live 2026"
              date="March 15-16, 2026"
              location="London, UK"
              description="The flagship event for Amazon sellers. Two days of intensive learning and networking."
              price="From £397"
              ctaLabel="Get Tickets"
              ctaHref="#"
              featured
            />
            <EventCard
              title="AI Workshop: Transform Your Amazon Business"
              date="February 8, 2026"
              location="Online"
              description="A one-day intensive workshop on leveraging AI tools for Amazon success."
              price="£197"
              ctaLabel="Register Now"
              ctaHref="#"
            />
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Amazon Business?"
        description="Join thousands of sellers who have accelerated their growth with Seller Sessions."
        primaryCTA={{ label: "Get Your Ticket", href: "#tickets" }}
        secondaryCTA={{ label: "Listen to Podcast", href: "#podcast" }}
      />

      {/* Simple Footer */}
      <footer className="bg-ss-bg-card py-8 border-t border-ss-border">
        <Container>
          <div className="text-center text-ss-text-secondary text-sm">
            <p>© 2026 Seller Sessions. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}

export default App
```

---

## Components

### src/components/index.ts

```typescript
export { Button } from './Button'
export { Card } from './Card'
export { Container } from './Container'
export { Section } from './Section'
export { Badge } from './Badge'
export { Hero } from './Hero'
export { EventCard } from './EventCard'
export { FeatureGrid } from './FeatureGrid'
export { CTASection } from './CTASection'
```

### src/components/Button.tsx

```tsx
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
  cta: 'bg-ss-orange text-white hover:bg-ss-orange-dark shadow-glow-orange',
  outline: 'bg-transparent text-ss-text border-2 border-ss-purple hover:bg-ss-purple',
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
        <a href={href} className={classes}>
          {leftIcon}
          {children}
          {rightIcon}
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
```

### src/components/Card.tsx

```tsx
import { HTMLAttributes, ReactNode, forwardRef } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  border?: boolean
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, padding = 'md', border = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'bg-ss-bg-card rounded-xl shadow-card transition-all duration-300',
          border && 'border border-ss-border',
          hover && 'hover:border-ss-purple hover:shadow-glow hover:-translate-y-1 cursor-pointer',
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
```

### src/components/Container.tsx

```tsx
import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'xl', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'mx-auto px-4 md:px-8',
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'
```

### src/components/Section.tsx

```tsx
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
        ref={ref as any}
        className={clsx(paddings[padding], className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Section.displayName = 'Section'
```

### src/components/Badge.tsx

```tsx
import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

type BadgeVariant = 'default' | 'purple' | 'orange' | 'gold' | 'success' | 'outline'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-ss-bg-hover text-ss-text',
  purple: 'bg-ss-purple/20 text-ss-purple-light border border-ss-purple/30',
  orange: 'bg-ss-orange/20 text-ss-orange border border-ss-orange/30',
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
```

### src/components/Hero.tsx

```tsx
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './Button'
import { Badge } from './Badge'
import { Container } from './Container'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  badge?: string
  backgroundImage?: string
}

export function Hero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  badge,
  backgroundImage,
}: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-ss-purple/20 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-ss-orange/10 blur-3xl" />
      </div>

      <Container className="relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Badge variant="purple" className="mb-6">
                {badge}
              </Badge>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-ss-orange font-semibold mb-4"
            >
              {subtitle}
            </motion.p>
          )}

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-ss-text-secondary mb-8 max-w-2xl"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            {primaryCTA && (
              <Button variant="cta" size="lg" href={primaryCTA.href} rightIcon={<ArrowRight className="w-5 h-5" />}>
                {primaryCTA.label}
              </Button>
            )}
            {secondaryCTA && (
              <Button variant="outline" size="lg" href={secondaryCTA.href}>
                {secondaryCTA.label}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
```

### src/components/EventCard.tsx

```tsx
import { motion } from 'framer-motion'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { Card } from './Card'
import { Button } from './Button'
import { Badge } from './Badge'

interface EventCardProps {
  title: string
  date: string
  location: string
  description: string
  price?: string
  ctaLabel?: string
  ctaHref?: string
  featured?: boolean
  image?: string
}

export function EventCard({
  title,
  date,
  location,
  description,
  price,
  ctaLabel = 'Learn More',
  ctaHref = '#',
  featured = false,
  image,
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={featured ? 'border-ss-purple shadow-glow' : ''}
        padding="none"
      >
        {image && (
          <div className="aspect-video w-full overflow-hidden rounded-t-xl">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-6">
          {featured && (
            <Badge variant="gold" className="mb-4">Featured Event</Badge>
          )}

          <h3 className="text-xl font-bold mb-3">{title}</h3>

          <div className="flex flex-col gap-2 mb-4 text-ss-text-secondary">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-ss-orange" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-ss-orange" />
              <span>{location}</span>
            </div>
          </div>

          <p className="text-ss-text-secondary mb-6">{description}</p>

          <div className="flex items-center justify-between">
            {price && (
              <span className="text-lg font-bold text-ss-orange">{price}</span>
            )}
            <Button
              variant={featured ? 'cta' : 'primary'}
              size="sm"
              href={ctaHref}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
```

### src/components/FeatureGrid.tsx

```tsx
import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Card } from './Card'

interface Feature {
  icon: ReactNode
  title: string
  description: string
}

interface FeatureGridProps {
  features: Feature[]
  columns?: 2 | 3 | 4
}

export function FeatureGrid({ features, columns = 4 }: FeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card hover className="h-full text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ss-purple/20 text-ss-purple-light mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-ss-text-secondary text-sm">{feature.description}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
```

### src/components/CTASection.tsx

```tsx
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './Button'
import { Container } from './Container'

interface CTASectionProps {
  title: string
  description?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
}

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
}: CTASectionProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-purple opacity-90" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-ss-orange/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>

          {description && (
            <p className="text-lg text-ss-text-secondary mb-8">{description}</p>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            {primaryCTA && (
              <Button
                variant="cta"
                size="lg"
                href={primaryCTA.href}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                {primaryCTA.label}
              </Button>
            )}
            {secondaryCTA && (
              <Button variant="outline" size="lg" href={secondaryCTA.href}>
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
```

---

## WordPress Build Script

### scripts/generate-embed.js

```javascript
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.join(__dirname, '..', 'dist')
const assetsPath = path.join(distPath, 'assets')

// Check if dist exists
if (!fs.existsSync(assetsPath)) {
  console.error('Error: dist/assets folder not found. Run "npm run build" first.')
  process.exit(1)
}

const files = fs.readdirSync(assetsPath)
const jsFile = files.find(f => f.endsWith('.js') && !f.includes('chunk'))
const cssFile = files.find(f => f.endsWith('.css'))

if (!jsFile) {
  console.error('Error: No JavaScript bundle found in dist/assets')
  process.exit(1)
}

const timestamp = new Date().toISOString()

const template = `<!--
  Seller Sessions WordPress Page Embed
  Generated: ${timestamp}

  ==========================================
  INSTRUCTIONS:
  ==========================================

  1. UPLOAD FILES TO WORDPRESS:
     - Go to WordPress Admin > Media > Add New
     - Upload: dist/assets/${jsFile}
     ${cssFile ? `- Upload: dist/assets/${cssFile}` : ''}
     - Copy the URL of each uploaded file

  2. REPLACE PLACEHOLDER URLS BELOW:
     - Replace YOUR_JS_URL with the JavaScript file URL
     ${cssFile ? '- Replace YOUR_CSS_URL with the CSS file URL' : ''}

  3. ADD TO WORDPRESS PAGE:
     - Edit your page with Elementor or Gutenberg
     - Add a "Custom HTML" block/widget
     - Paste this entire code block
     - Save and preview

  ==========================================
  IMPORTANT NOTES:
  ==========================================

  - The app renders inside <div id="ss-page-root">
  - Uses scoped ID to avoid conflicts with WordPress
  - Requires module script type for React
  - Google Fonts are loaded automatically

-->

<!-- Google Fonts (required for Inter & Poppins) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">

${cssFile ? `<!-- Styles -->
<link rel="stylesheet" href="YOUR_CSS_URL">` : ''}

<!-- App Container -->
<div id="root" style="min-height: 100vh;"></div>

<!-- React App Bundle -->
<script type="module" src="YOUR_JS_URL"></script>

<!--
  TROUBLESHOOTING:

  1. Page shows blank:
     - Check browser console for errors (F12)
     - Verify URLs are correct and accessible
     - Ensure script has type="module"

  2. Styles look wrong:
     - Check if CSS file uploaded correctly
     - Clear WordPress cache (WP Rocket, etc.)
     - Check for CSS conflicts with theme

  3. Fonts not loading:
     - Verify Google Fonts links are included
     - Check Content Security Policy headers
-->
`

// Write template
fs.writeFileSync(path.join(distPath, 'wordpress-embed.html'), template)

// Also create a version info file
const info = {
  generated: timestamp,
  files: {
    javascript: jsFile,
    css: cssFile || null,
  },
  instructions: 'See wordpress-embed.html for usage instructions'
}

fs.writeFileSync(path.join(distPath, 'build-info.json'), JSON.stringify(info, null, 2))

console.log('')
console.log('✅ WordPress embed template generated!')
console.log('')
console.log('Files to upload:')
console.log(`  📦 dist/assets/${jsFile}`)
if (cssFile) {
  console.log(`  🎨 dist/assets/${cssFile}`)
}
console.log('')
console.log('📄 See dist/wordpress-embed.html for instructions')
console.log('')
```

---

## CLAUDE.md (For AI Assistants)

```markdown
# Seller Sessions Page Builder

React + TypeScript project for building WordPress-compatible pages with the Seller Sessions design system.

## Quick Reference

### Key Files
- `src/App.tsx` - **BUILD PAGES HERE** - Main page component
- `src/components/` - Reusable UI components
- `src/index.css` - Global styles, CSS variables, Tailwind config
- `tailwind.config.js` - Tailwind theme with SS brand colors

### Brand Colors
- Primary Purple: `#2F0453` (ss-purple)
- Accent Orange: `#F97316` (ss-orange)
- Gold: `#FBBF24` (ss-gold)
- Dark Background: `#0A0A0A` (ss-bg)
- Card Background: `#1A1A1A` (ss-bg-card)
- Primary Text: `#FAFAFC` (ss-text)

### Available Components
- `Button` - Primary, secondary, CTA, outline variants
- `Card` - Content cards with optional hover effect
- `Container` - Responsive width container
- `Section` - Page sections with padding options
- `Badge` - Labels and tags
- `Hero` - Hero section with CTA buttons
- `EventCard` - Event listing cards
- `FeatureGrid` - Grid of feature cards
- `CTASection` - Call-to-action banner

### Building a Page

1. Open `src/App.tsx`
2. Import needed components: `import { Hero, Section, Container, Button } from './components'`
3. Compose your page using components
4. Add Framer Motion for animations
5. Use Lucide icons: `import { Icon } from 'lucide-react'`

### Tailwind Classes (SS Theme)
```
Backgrounds: bg-ss-bg, bg-ss-bg-card, bg-ss-bg-hover
Text: text-ss-text, text-ss-text-secondary, text-ss-text-tertiary
Colors: text-ss-purple, text-ss-orange, text-ss-gold
Borders: border-ss-border, border-ss-purple
Shadows: shadow-glow, shadow-glow-orange, shadow-card
```

### Commands
- `npm run dev` - Start dev server (localhost:5173)
- `npm run build:wp` - Build for WordPress deployment

### WordPress Deployment
1. Run `npm run build:wp`
2. Upload `dist/assets/*.js` and `dist/assets/*.css` to WordPress Media Library
3. Copy URLs from Media Library
4. Edit `dist/wordpress-embed.html`, replace URL placeholders
5. Paste into WordPress Custom HTML block

### Important Rules
- Always use `type="module"` on script tags
- App mounts to `<div id="root"></div>`
- Keep styles scoped to avoid WordPress conflicts
- Test locally before deploying
```

---

## Workflow Summary

```
┌─────────────────────────────────────────────────────────────┐
│  1. DEVELOP                                                  │
│     npm run dev → Edit src/App.tsx → Preview at :5173       │
├─────────────────────────────────────────────────────────────┤
│  2. BUILD                                                    │
│     npm run build:wp → Generates dist/ folder               │
├─────────────────────────────────────────────────────────────┤
│  3. UPLOAD                                                   │
│     WordPress Admin → Media → Add New                        │
│     Upload: dist/assets/*.js and dist/assets/*.css          │
├─────────────────────────────────────────────────────────────┤
│  4. EMBED                                                    │
│     Edit Page → Add Custom HTML Block                        │
│     Paste wordpress-embed.html with correct URLs            │
├─────────────────────────────────────────────────────────────┤
│  5. PUBLISH                                                  │
│     Preview → Publish → Clear cache if needed               │
└─────────────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| Blank page | Check browser console, verify URLs, ensure `type="module"` |
| Styles missing | Verify CSS upload, clear WP cache, check URL |
| Fonts wrong | Ensure Google Fonts links are included |
| Layout broken | Check for WordPress theme CSS conflicts |
| Animations not working | Framer Motion requires React 18+ |

### WordPress Theme Conflicts

If styles conflict with your WordPress theme, add this wrapper in `src/index.css`:

```css
#root {
  all: initial;
  font-family: 'Inter', system-ui, sans-serif;
}

#root *, #root *::before, #root *::after {
  box-sizing: border-box;
}
```

### Content Security Policy

If scripts are blocked, ensure your WordPress site allows:
- `script-src 'self'` for your uploaded JS
- `style-src 'self' https://fonts.googleapis.com`
- `font-src https://fonts.gstatic.com`
