import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 py-4 backdrop-blur-xl transition-colors duration-300"
      style={{
        background: 'var(--bg-navbar)',
        borderBottom: '1px solid var(--border-secondary)',
      }}
    >
      <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-green flex items-center justify-center text-sm font-extrabold text-[#0a0b0f]">
            T
          </div>
          <span style={{ color: 'var(--text-primary)' }}>Termoras</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium transition-colors duration-200 hover:opacity-100"
            style={{ color: 'var(--text-secondary)' }}
          >
            Features
          </a>
          <a
            href="#showcase"
            className="text-sm font-medium transition-colors duration-200 hover:opacity-100"
            style={{ color: 'var(--text-secondary)' }}
          >
            Showcase
          </a>
          <a
            href="#tech"
            className="text-sm font-medium transition-colors duration-200 hover:opacity-100"
            style={{ color: 'var(--text-secondary)' }}
          >
            Tech
          </a>

          <ThemeToggle />

          <a
            href="#download"
            className="px-5 py-2 rounded-lg text-[13px] font-semibold bg-gradient-to-br from-brand-blue to-brand-green text-[#0a0b0f] transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          >
            Download
          </a>
        </div>

        {/* Mobile: theme toggle only */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
