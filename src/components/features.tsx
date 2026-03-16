import { Terminal, LayoutGrid, GitBranch, Zap, SunMoon, FolderKanban } from 'lucide-react'
import type { ReactNode } from 'react'
import { useLanguage } from '../context/language-context'

const featuresMeta: {
  icon: ReactNode
  iconBg: string
  iconColor: string
  glowColor: string
}[] = [
  {
    icon: <Terminal size={20} />,
    iconBg: 'rgba(107,161,241,0.1)',
    iconColor: '#6ba1f1',
    glowColor: 'rgba(107,161,241,0.06)',
  },
  {
    icon: <LayoutGrid size={20} />,
    iconBg: 'rgba(167,139,250,0.1)',
    iconColor: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.06)',
  },
  {
    icon: <GitBranch size={20} />,
    iconBg: 'rgba(240,111,111,0.1)',
    iconColor: '#f06f6f',
    glowColor: 'rgba(240,111,111,0.06)',
  },
  {
    icon: <Zap size={20} />,
    iconBg: 'rgba(94,196,168,0.1)',
    iconColor: '#5ec4a8',
    glowColor: 'rgba(94,196,168,0.06)',
  },
  {
    icon: <SunMoon size={20} />,
    iconBg: 'rgba(240,196,111,0.1)',
    iconColor: '#f0c46f',
    glowColor: 'rgba(240,196,111,0.06)',
  },
  {
    icon: <FolderKanban size={20} />,
    iconBg: 'rgba(107,161,241,0.1)',
    iconColor: '#6ba1f1',
    glowColor: 'rgba(107,161,241,0.06)',
  },
]

export function Features() {
  const { t } = useLanguage()

  return (
    <section className="py-28 relative" id="features">
      <div className="section-separator" />

      <div className="max-w-[1120px] mx-auto px-6 pt-20">
        <p className="fade-up text-center text-[13px] font-semibold uppercase tracking-[3px] text-brand-blue mb-4">
          {t.features.label}
        </p>
        <h2 className="fade-up text-center text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight mb-4">
          {t.features.title}
        </h2>
        <p
          className="fade-up text-center text-base max-w-[480px] mx-auto mb-16"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t.features.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuresMeta.map((f, i) => (
            <div
              key={i}
              className={`fade-up stagger-${Math.min(i + 1, 6)} glow-card p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] group`}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Subtle glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 20%, ${f.glowColor}, transparent 70%)` }}
              />

              <div className="relative">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: f.iconBg, color: f.iconColor }}
                >
                  {f.icon}
                </div>
                <h3 className="text-[17px] font-bold tracking-tight mb-2.5">{t.features.items[i].title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t.features.items[i].description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
