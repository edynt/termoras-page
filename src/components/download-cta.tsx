import { Download, HardDrive, Activity, ShieldCheck, WifiOff, UserX } from 'lucide-react'
import { useLatestRelease } from '../hooks/use-latest-release'
import { useLanguage } from '../context/language-context'

export function DownloadCta() {
  const { aarch64DmgUrl, x64DmgUrl, amd64DebUrl } = useLatestRelease()
  const { t } = useLanguage()

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
              {t.downloadCta.title} <span className="gradient-text">{t.downloadCta.titleHighlight}</span>?
            </h2>
            <p className="text-base mb-9" style={{ color: 'var(--text-secondary)' }}>
              {t.downloadCta.subtitle}
            </p>

            <div className="flex gap-3 justify-center flex-wrap max-md:flex-col max-md:items-center">
              <a
                href={aarch64DmgUrl}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-br from-brand-blue to-brand-green text-[#0a0b0f] text-[15px] font-semibold transition-all duration-200 hover:-translate-y-0.5 btn-press"
                style={{ boxShadow: '0 4px 24px rgba(107,161,241,0.3), 0 1px 3px rgba(0,0,0,0.1)' }}
              >
                <Download size={17} />
                {t.downloadCta.appleSilicon}
              </a>
              <a
                href={x64DmgUrl}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 hover:-translate-y-0.5 btn-press"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-card)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Download size={17} style={{ opacity: 0.5 }} />
                {t.downloadCta.intel}
              </a>
              <a
                href={amd64DebUrl}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 hover:-translate-y-0.5 btn-press"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-card)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Download size={17} style={{ opacity: 0.5 }} />
                {t.downloadCta.linux}
              </a>
            </div>

            <div
              className="flex gap-6 justify-center mt-6 text-[13px] flex-wrap"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <span className="flex items-center gap-1.5">
                <HardDrive size={14} />
                {t.downloadCta.dmg}
              </span>
              <span className="flex items-center gap-1.5">
                <Activity size={14} />
                {t.downloadCta.macOnly}
              </span>
            </div>

            {/* Trust badges */}
            <div
              className="flex gap-5 justify-center mt-5 text-[13px] flex-wrap"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-brand-green" />
                {t.downloadCta.trustNoData}
              </span>
              <span className="flex items-center gap-1.5">
                <WifiOff size={14} className="text-brand-blue" />
                {t.downloadCta.trustOffline}
              </span>
              <span className="flex items-center gap-1.5">
                <UserX size={14} className="text-brand-purple" />
                {t.downloadCta.trustNoAccount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
