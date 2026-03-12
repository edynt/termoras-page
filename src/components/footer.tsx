import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-10 text-center">
      <div className="section-separator mb-10" />
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="flex items-center justify-center gap-2.5 mb-3">
          <img src="/icons/128x128.png" alt="Termoras" width={20} height={20} className="w-5 h-5 rounded opacity-50" />
          <span className="text-sm font-semibold" style={{ color: 'var(--text-tertiary)' }}>
            Termoras
          </span>
        </div>
        <p className="text-[13px] mb-4" style={{ color: 'var(--text-muted)' }}>
          A native terminal manager for developers.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/edynt/termoras"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-200 hover:text-brand-blue"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <Github size={15} />
            GitHub
          </a>
        </div>
        <p className="text-[12px] mt-6" style={{ color: 'var(--text-muted)' }}>
          &copy; 2026 Termoras. Built with Tauri + React + Rust.
        </p>
      </div>
    </footer>
  )
}
