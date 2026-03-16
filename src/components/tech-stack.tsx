import { useLanguage } from '../context/language-context'

const techItems = [
  { label: 'Tauri v2', icon: 'T', color: '#f0c46f' },
  { label: 'React 19', icon: '\u269B', color: '#61dafb' },
  { label: 'Rust', icon: 'R', color: '#f06f6f' },
  { label: 'TypeScript', icon: 'TS', color: '#3178c6' },
  { label: 'Tailwind CSS', icon: '\u224B', color: '#38bdf8' },
  { label: 'xterm.js', icon: '\u25B8_', color: '#5ec4a8' },
]

export function TechStack() {
  const { t } = useLanguage()

  return (
    <section className="py-20 pb-28 relative" id="tech">
      <div className="section-separator" />

      <div className="max-w-[1120px] mx-auto px-6 pt-20">
        <p className="fade-up text-center text-[13px] font-semibold uppercase tracking-[3px] text-brand-blue mb-4">
          {t.tech.label}
        </p>
        <h2 className="fade-up text-center text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight mb-4">
          {t.tech.title}
        </h2>
        <p
          className="fade-up text-center text-base max-w-[480px] mx-auto mb-14"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t.tech.subtitle}
        </p>

        <div className="fade-up flex gap-6 justify-center flex-wrap">
          {techItems.map((item, i) => (
            <div
              key={item.label}
              className={`stagger-${i + 1} flex flex-col items-center gap-3 group`}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-card-hover)]"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                  color: item.color,
                  backdropFilter: 'blur(12px)',
                }}
              >
                {item.icon}
              </div>
              <span
                className="text-xs font-semibold transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
