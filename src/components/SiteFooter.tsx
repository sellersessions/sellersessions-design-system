const LOGO_URL = 'https://sellersessions.com/wp-content/uploads/2024/07/Seller-sessions-header-logo-2024.webp'

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/sellersessions/', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { label: 'YouTube', href: 'https://www.youtube.com/sellersessions', icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88.46-8.6.92a2.78 2.78 0 00-1.94 2A29.94 29.94 0 001 12a29.94 29.94 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88-.46 8.6-.92a2.78 2.78 0 001.94-2A29.94 29.94 0 0023 12a29.94 29.94 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
  { label: 'Instagram', href: 'https://www.instagram.com/dannymac1000', icon: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm2 12a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8a2 2 0 012 2v8zm-6-7a3 3 0 100 6 3 3 0 000-6zm4.5-.5a1 1 0 100-2 1 1 0 000 2z' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/sellersessions/', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z' },
]

const QUICK_LINKS = [
  { label: 'Home', href: 'https://sellersessions.com/' },
  { label: 'Blog', href: 'https://sellersessions.com/blog-2/' },
  { label: 'Contact Us', href: 'https://sellersessions.com/contact/' },
]

const EVENT_LINKS = [
  { label: 'Seller Sessions Live 2026', href: 'https://sellersessions.com/sp/seller-sessions-live-2026/' },
  { label: 'Seller Sessions Workshops', href: 'https://sellersessions.com/ai-workshop-2025/' },
]

export function SiteFooter() {
  return (
    <footer className="px-5 pb-5 md:px-[30px] md:pb-[30px]">
      <div className="site-footer-gradient-border">
        <div className="site-footer-inner pt-20 md:pt-[120px] px-6 md:px-10 pb-8">
          {/* Main footer content */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 max-w-6xl mx-auto">
            {/* Column 1 - Logo & Social */}
            <div className="space-y-6">
              <img src={LOGO_URL} alt="Seller Sessions" className="h-7 md:h-8" />
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 flex items-center justify-center rounded-xl no-underline transition-all hover:shadow-[3px_3px_5px_rgba(105,42,239,0.44)]"
                    style={{ background: 'radial-gradient(at top left, #1F1F1F 0%, #0E0E0E 70%)' }}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#753EF7]" fill="currentColor">
                      <path d={s.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h5 className="text-white text-base font-bold mb-4" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Quick Links</h5>
              <ul className="space-y-2">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[#8B8B8B] hover:text-[#753EF7] text-sm font-medium no-underline transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Events */}
            <div>
              <h5 className="text-white text-base font-bold mb-4" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Events</h5>
              <ul className="space-y-2">
                {EVENT_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[#8B8B8B] hover:text-[#753EF7] text-sm font-medium no-underline transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Contact */}
            <div>
              <h5 className="text-white text-base font-bold mb-4" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Contact Info</h5>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#753EF7] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a href="mailto:danny@sellersessions.com" className="text-[#D1D1D1] hover:text-white no-underline font-bold transition-colors">
                    danny@sellersessions.com
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#753EF7] mt-0.5 shrink-0" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="text-[#D1D1D1] font-bold">
                    71-75 Shelton Street, Covent Garden, London, WC2H 9JQ
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-10 mt-12 pt-6 border-t border-[#1F1F1F] flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
            <p className="text-sm text-[#8B8B8B]">&copy; 2026, Seller Sessions - All rights reserved</p>
            <div className="flex items-center gap-4 text-sm">
              <a href="https://sellersessions.com/privacy-policy/" className="text-[#8B8B8B] hover:text-[#D1D1D1] no-underline transition-colors">Privacy Policy</a>
              <span className="text-[#753EF7]">|</span>
              <a href="https://sellersessions.com/terms-and-conditions/" className="text-[#8B8B8B] hover:text-[#D1D1D1] no-underline transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
