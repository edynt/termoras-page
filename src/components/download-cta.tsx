import { Download, Shield, HardDrive, Activity } from 'lucide-react'

export function DownloadCta() {
  return (
    <section className="py-24 pb-28 text-center relative" id="download">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--glow-green) 0%, transparent 60%)' }}
      />

      <div className="max-w-[1120px] mx-auto px-6">
        <div
          className="fade-up p-16 max-md:p-10 max-md:px-6 rounded-3xl relative"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-primary)',
          }}
        >
          <h2 className="text-[clamp(28px,4vw,38px)] font-extrabold tracking-tight mb-3">
            Ready to organize your <span className="gradient-text">terminal workflow</span>?
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
            Download Termoras for free and get started in seconds.
          </p>

          <a
            href="./Termoras_0.1.0_x64.dmg"
            download
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-br from-brand-blue to-brand-green text-[#0a0b0f] text-base font-bold transition-all duration-200 hover:opacity-95 hover:-translate-y-0.5"
            style={{ boxShadow: '0 4px 24px rgba(107,161,241,0.25)' }}
          >
            <Download size={18} />
            Download Termoras v0.1.0
          </a>

          <div className="flex gap-6 justify-center mt-5 text-[13px] flex-wrap" style={{ color: 'var(--text-tertiary)' }}>
            <span className="flex items-center gap-1.5">
              <Shield size={14} />
              macOS Intel (x64)
            </span>
            <span className="flex items-center gap-1.5">
              <HardDrive size={14} />
              .dmg installer
            </span>
            <span className="flex items-center gap-1.5">
              <Activity size={14} />
              Free &amp; open source
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
