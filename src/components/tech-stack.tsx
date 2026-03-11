const techItems = [
  { label: 'Tauri v2', icon: 'T', color: '#f0c46f' },
  { label: 'React 19', icon: '\u269B', color: '#61dafb' },
  { label: 'Rust', icon: 'R', color: '#f06f6f' },
  { label: 'TypeScript', icon: 'TS', color: '#3178c6' },
  { label: 'Tailwind CSS', icon: '\u224B', color: '#38bdf8' },
  { label: 'xterm.js', icon: '\u25B8_', color: '#5ec4a8' },
]

export function TechStack() {
  return (
    <section className="py-20 pb-28" id="tech">
      <div className="max-w-[1120px] mx-auto px-6">
        <p className="fade-up text-center text-[13px] font-semibold uppercase tracking-[2px] text-brand-blue mb-4">
          Built With
        </p>
        <h2 className="fade-up text-center text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight mb-4">
          Modern tech, native feel
        </h2>
        <p className="fade-up text-center text-base max-w-[480px] mx-auto mb-12" style={{ color: 'var(--text-secondary)' }}>
          Powered by the best tools in the ecosystem for performance and developer experience.
        </p>

        <div className="fade-up flex gap-10 justify-center flex-wrap mt-12">
          {techItems.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2.5 group">
              <div
                className="w-14 h-14 rounded-[14px] flex items-center justify-center text-2xl font-extrabold transition-all duration-300 group-hover:-translate-y-0.5"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                  color: item.color,
                }}
              >
                {item.icon}
              </div>
              <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
