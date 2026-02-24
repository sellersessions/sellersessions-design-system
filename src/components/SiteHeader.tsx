import { useState } from 'react'
import { Menu, X, User } from 'lucide-react'

const LOGO_URL = 'https://sellersessions.com/wp-content/uploads/2024/07/Seller-sessions-header-logo-2024.webp'

const NAV_ITEMS = [
  { label: 'Home', href: 'https://sellersessions.com/' },
  { label: 'Podcast', href: 'https://sellersessions.com/blog/' },
  { label: 'Conferences', href: 'https://sellersessions.com/events/' },
  { label: 'Amazon Blog', href: 'https://sellersessions.com/amazon-seller-blog/' },
  { label: 'Contact', href: 'https://sellersessions.com/contact/' },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="p-5 md:p-[30px]">
      <div className="site-header-bar flex items-center justify-between">
        {/* Logo */}
        <a href="https://sellersessions.com/" className="shrink-0">
          <img src={LOGO_URL} alt="Seller Sessions" className="h-6 md:h-7" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-2 text-sm font-semibold text-[#D1D1D1] hover:text-[#753EF7] transition-colors no-underline"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://sellersessions.com/login-2"
            className="flex items-center gap-2 text-sm font-semibold text-white hover:text-[#753EF7] transition-colors no-underline"
          >
            <User className="w-4 h-4" />
            <span>Returning Customer</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 rounded-[25px] border border-[#1F1F1F] bg-[#0E0E0E] p-6">
          <nav className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[#D1D1D1] hover:text-[#753EF7] font-semibold text-base no-underline py-1"
              >
                {item.label}
              </a>
            ))}
            <hr className="border-[#1F1F1F] my-2" />
            <a
              href="https://sellersessions.com/login-2"
              className="flex items-center gap-2 text-white hover:text-[#753EF7] font-semibold no-underline"
            >
              <User className="w-4 h-4" />
              Returning Customer
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
