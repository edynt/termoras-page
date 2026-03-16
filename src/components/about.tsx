import { Lightbulb, AlertTriangle } from 'lucide-react'
import { useLanguage } from '../context/language-context'

export function About() {
  const { t } = useLanguage()

  return (
    <section className="py-28 relative" id="about">
      <div className="section-separator" />

      <div className="max-w-[1120px] mx-auto px-6 pt-20">
        <p className="fade-up text-center text-[13px] font-semibold uppercase tracking-[3px] text-brand-blue mb-4">
          {t.about.label}
        </p>
        <h2 className="fade-up text-center text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight mb-4">
          {t.about.title}
        </h2>
        <p
          className="fade-up text-center text-base max-w-[560px] mx-auto mb-16"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t.about.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Problem */}
          <div
            className="fade-up stagger-1 glow-card p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] group"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 30% 20%, rgba(240,111,111,0.06), transparent 70%)' }}
            />
            <div className="relative">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'rgba(240,111,111,0.1)', color: '#f06f6f' }}
              >
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-lg font-bold tracking-tight mb-3">{t.about.problem.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t.about.problem.description}
              </p>
            </div>
          </div>

          {/* Solution */}
          <div
            className="fade-up stagger-2 glow-card p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] group"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 30% 20%, rgba(94,196,168,0.06), transparent 70%)' }}
            />
            <div className="relative">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'rgba(94,196,168,0.1)', color: '#5ec4a8' }}
              >
                <Lightbulb size={20} />
              </div>
              <h3 className="text-lg font-bold tracking-tight mb-3">{t.about.solution.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t.about.solution.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
