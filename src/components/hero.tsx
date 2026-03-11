import { Download } from 'lucide-react'
import { AppPreview } from './app-preview'

export function Hero() {
  return (
    <section className="relative pt-44 pb-24 text-center max-md:pt-32 max-md:pb-16 overflow-hidden">
      {/* Ambient orbs */}
      <div
        className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] pointer-events-none animate-float"
        style={{ background: 'radial-gradient(circle, var(--glow-blue) 0%, transparent 55%)' }}
      />
      <div
        className="absolute top-[-100px] left-[20%] w-[500px] h-[500px] pointer-events-none animate-float-delayed"
        style={{ background: 'radial-gradient(circle, var(--glow-purple) 0%, transparent 55%)' }}
      />
      <div
        className="absolute top-[100px] right-[15%] w-[400px] h-[400px] pointer-events-none animate-float-slow"
        style={{ background: 'radial-gradient(circle, var(--glow-green) 0%, transparent 55%)' }}
      />

      <div className="max-w-[1120px] mx-auto px-6 relative">
        {/* Badge */}
        <div
          className="fade-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[13px] font-medium text-brand-blue mb-8 animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, rgba(107,161,241,0.08), rgba(94,196,168,0.08), rgba(107,161,241,0.08))',
            border: '1px solid rgba(107,161,241,0.15)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse-dot" />
          v0.1.0 — Now available for macOS (Universal)
        </div>

        {/* Heading */}
        <h1 className="fade-up text-[clamp(44px,6.5vw,76px)] font-extrabold tracking-[-0.03em] leading-[1.05] mb-6">
          Your terminals,
          <br />
          <span className="gradient-text">organized.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="fade-up text-lg max-w-[520px] mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          A blazing-fast desktop app that groups terminals by project — with
          built-in kanban boards and Git integration.
        </p>

        {/* CTA */}
        <div className="fade-up flex gap-3.5 justify-center flex-wrap max-md:flex-col max-md:items-center">
          <a
            href="./Termoras_0.1.0_universal.dmg"
            download
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-br from-brand-blue to-brand-green text-[#0a0b0f] text-base font-bold transition-all duration-200 hover:-translate-y-0.5 btn-press"
            style={{ boxShadow: '0 4px 24px rgba(107,161,241,0.3), 0 1px 3px rgba(0,0,0,0.1)' }}
          >
            <Download size={18} />
            Download for macOS
          </a>
        </div>

        {/* Meta */}
        <p className="fade-up mt-5 text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
          macOS Universal (Intel + Apple Silicon) &middot;{' '}
          <span style={{ color: 'var(--text-secondary)' }}>Termoras_0.1.0_universal.dmg</span> &middot;
          Free &amp; open source
        </p>

        <AppPreview />
      </div>
    </section>
  )
}
