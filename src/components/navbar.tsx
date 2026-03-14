import { useState, useEffect } from 'react'
import { ThemeToggle } from './theme-toggle'

const NAV_ITEMS: { label: string; hash: string }[] = [
  { label: 'Features', hash: 'features' },
  { label: 'Showcase', hash: 'showcase' },
  { label: 'Tech', hash: 'tech' },
  { label: 'Feedback', hash: 'feedback' },
]
const hasDonate = !!import.meta.env.VITE_PAYPAL_ME_USERNAME ||
  (!!import.meta.env.VITE_VIETQR_BANK_BIN && !!import.meta.env.VITE_VIETQR_ACCOUNT_NO)
if (hasDonate) NAV_ITEMS.push({ label: 'Buy a coffee', hash: 'donate' })

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'var(--bg-navbar)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        borderBottom: scrolled ? '1px solid var(--border-primary)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.04)' : 'none',
        padding: scrolled ? '12px 0' : '16px 0',
      }}
    >
      <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 text-lg font-bold tracking-tight group">
          <img
            src="/icons/128x128.png"
            alt="Termoras"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg transition-transform duration-200 group-hover:scale-105"
          />
          <span
            className="transition-colors duration-200"
            style={{ color: 'var(--text-primary)' }}
          >
            Termoras
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.hash}
              href={`#${item.hash}`}
              className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[var(--bg-tertiary)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {item.label}
            </a>
          ))}

          <div className="w-px h-5 mx-2" style={{ background: 'var(--border-primary)' }} />

          <ThemeToggle />

          <a
            href="#download"
            className="ml-2 px-5 py-2 rounded-lg text-[13px] font-semibold bg-gradient-to-br from-brand-blue to-brand-green text-[#0a0b0f] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 btn-press"
            style={{ boxShadow: '0 2px 12px rgba(107,161,241,0.2)' }}
          >
            Download
          </a>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <a
            href="#download"
            className="px-4 py-2 rounded-lg text-[13px] font-semibold bg-gradient-to-br from-brand-blue to-brand-green text-[#0a0b0f] transition-all duration-200 btn-press"
            style={{ boxShadow: '0 2px 12px rgba(107,161,241,0.2)' }}
          >
            Download
          </a>
        </div>
      </div>
    </nav>
  )
}
