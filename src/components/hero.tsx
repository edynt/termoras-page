import { Download } from 'lucide-react'
import { AppPreview } from './app-preview'

export function Hero() {
  return (
    <section className="relative pt-40 pb-24 text-center max-md:pt-28 max-md:pb-16">
      {/* Background glow */}
      <div
        className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--glow-blue) 0%, transparent 60%)' }}
      />

      <div className="max-w-[1120px] mx-auto px-6 relative">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium text-brand-blue mb-7"
          style={{
            background: 'rgba(107,161,241,0.1)',
            border: '1px solid rgba(107,161,241,0.2)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse-dot" />
          v0.1.0 — Now available for macOS
        </div>

        {/* Heading */}
        <h1 className="text-[clamp(42px,6vw,72px)] font-extrabold tracking-[-2px] leading-[1.1] mb-5">
          Your terminals,
          <br />
          <span className="gradient-text">organized.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg max-w-[540px] mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          A blazing-fast desktop app that groups terminals by project — with built-in kanban boards
          and Git integration. No more terminal chaos.
        </p>

        {/* Actions */}
        <div className="flex gap-3.5 justify-center flex-wrap max-md:flex-col max-md:items-center">
          <a
            href="./Termoras_0.1.0_x64.dmg"
            download
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-br from-brand-blue to-brand-green text-[#0a0b0f] text-base font-bold transition-all duration-200 hover:opacity-95 hover:-translate-y-0.5"
            style={{ boxShadow: '0 4px 24px rgba(107,161,241,0.25)' }}
          >
            <Download size={18} />
            Download for macOS
          </a>
        </div>

        {/* Meta */}
        <p className="mt-4 text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
          macOS Intel (x64) &middot;{' '}
          <span style={{ color: 'var(--text-secondary)' }}>Termoras_0.1.0_x64.dmg</span> &middot;
          Free &amp; open source
        </p>

        <AppPreview />
      </div>
    </section>
  )
}
