import { Terminal, LayoutGrid, GitBranch, Zap, SunMoon, FolderKanban } from 'lucide-react'
import type { ReactNode } from 'react'

const features: {
  icon: ReactNode
  iconBg: string
  iconColor: string
  glowColor: string
  title: string
  description: string
}[] = [
  {
    icon: <Terminal size={20} />,
    iconBg: 'rgba(107,161,241,0.1)',
    iconColor: '#6ba1f1',
    glowColor: 'rgba(107,161,241,0.06)',
    title: 'Project-based Terminals',
    description:
      'Group terminals by project. Switch between projects without killing processes. Each terminal runs a real PTY shell session.',
  },
  {
    icon: <LayoutGrid size={20} />,
    iconBg: 'rgba(167,139,250,0.1)',
    iconColor: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.06)',
    title: 'Built-in Kanban Board',
    description:
      'Plan tasks right next to your code. Drag-and-drop cards, assign tags, and auto-run terminal commands from cards — no context switching.',
  },
  {
    icon: <GitBranch size={20} />,
    iconBg: 'rgba(240,111,111,0.1)',
    iconColor: '#f06f6f',
    glowColor: 'rgba(240,111,111,0.06)',
    title: 'Git Integration',
    description:
      'Stage, commit, and push from a built-in diff viewer. Split or unified view with syntax highlighting and line numbers.',
  },
  {
    icon: <Zap size={20} />,
    iconBg: 'rgba(94,196,168,0.1)',
    iconColor: '#5ec4a8',
    glowColor: 'rgba(94,196,168,0.06)',
    title: 'Blazing Fast',
    description:
      'Built with Tauri + Rust backend. Native performance with minimal memory footprint — starts instantly, uses less than 100MB RAM.',
  },
  {
    icon: <SunMoon size={20} />,
    iconBg: 'rgba(240,196,111,0.1)',
    iconColor: '#f0c46f',
    glowColor: 'rgba(240,196,111,0.06)',
    title: 'Light & Dark Themes',
    description:
      'Switch seamlessly between light and dark modes. Carefully crafted color palettes for comfortable all-day use.',
  },
  {
    icon: <FolderKanban size={20} />,
    iconBg: 'rgba(107,161,241,0.1)',
    iconColor: '#6ba1f1',
    glowColor: 'rgba(107,161,241,0.06)',
    title: 'Multi-project Workflow',
    description:
      'Add projects by folder. See running indicators, git status badges, and change counts at a glance in the sidebar.',
  },
]

export function Features() {
  return (
    <section className="py-28 relative" id="features">
      <div className="section-separator" />

      <div className="max-w-[1120px] mx-auto px-6 pt-20">
        <p className="fade-up text-center text-[13px] font-semibold uppercase tracking-[3px] text-brand-blue mb-4">
          Features
        </p>
        <h2 className="fade-up text-center text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight mb-4">
          Everything you need, nothing you don't
        </h2>
        <p
          className="fade-up text-center text-base max-w-[480px] mx-auto mb-16"
          style={{ color: 'var(--text-secondary)' }}
        >
          Built for developers who juggle multiple projects daily.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
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
                <h3 className="text-[17px] font-bold tracking-tight mb-2.5">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
