import { Download, Shield, HardDrive, Activity } from 'lucide-react'

export function DownloadCta() {
  return (
    <section className="py-24 pb-28 text-center relative" id="download">
      <div className="section-separator" />

      {/* Ambient glow */}
      <div
        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--glow-green) 0%, transparent 55%)' }}
      />

      <div className="max-w-[1120px] mx-auto px-6 pt-20">
        <div
          className="fade-up glow-card p-16 max-md:p-10 max-md:px-6 rounded-3xl relative overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-primary)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, var(--glow-blue) 0%, transparent 70%)' }}
          />

          <div className="relative">
            <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold tracking-tight mb-4">
              Ready to organize your <span className="gradient-text">terminal workflow</span>?
            </h2>
            <p className="text-base mb-9" style={{ color: 'var(--text-secondary)' }}>
              Download Termoras for free and get started in seconds.
            </p>

            <a
              href="./Termoras_0.1.0_x64.dmg"
              download
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-br from-brand-blue to-brand-green text-[#0a0b0f] text-base font-bold transition-all duration-200 hover:-translate-y-0.5 btn-press"
              style={{ boxShadow: '0 4px 24px rgba(107,161,241,0.3), 0 1px 3px rgba(0,0,0,0.1)' }}
            >
              <Download size={18} />
              Download Termoras v0.1.0
            </a>

            <div
              className="flex gap-6 justify-center mt-6 text-[13px] flex-wrap"
              style={{ color: 'var(--text-tertiary)' }}
            >
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
      </div>
    </section>
  )
}
