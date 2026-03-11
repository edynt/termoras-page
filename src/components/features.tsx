import { Terminal, LayoutGrid, GitBranch, Zap, SunMoon, FolderKanban } from 'lucide-react'
import type { ReactNode } from 'react'

const features: {
  icon: ReactNode
  iconBg: string
  iconColor: string
  title: string
  description: string
}[] = [
  {
    icon: <Terminal size={20} />,
    iconBg: 'rgba(107,161,241,0.1)',
    iconColor: '#6ba1f1',
    title: 'Project-based Terminals',
    description:
      'Group terminals by project. Switch between projects without killing processes. Each terminal runs a real PTY shell session.',
  },
  {
    icon: <LayoutGrid size={20} />,
    iconBg: 'rgba(167,139,250,0.1)',
    iconColor: '#a78bfa',
    title: 'Built-in Kanban Board',
    description:
      'Plan your tasks right next to your terminals. Drag-and-drop cards between columns — no context switching needed.',
  },
  {
    icon: <GitBranch size={20} />,
    iconBg: 'rgba(240,111,111,0.1)',
    iconColor: '#f06f6f',
    title: 'Git Integration',
    description:
      'View changed files, stage, commit, and push — all from a GitHub-style diff viewer with line numbers and syntax colors.',
  },
  {
    icon: <Zap size={20} />,
    iconBg: 'rgba(94,196,168,0.1)',
    iconColor: '#5ec4a8',
    title: 'Blazing Fast',
    description:
      'Built with Tauri + Rust backend. Native performance with minimal memory footprint — 10x lighter than Electron alternatives.',
  },
  {
    icon: <SunMoon size={20} />,
    iconBg: 'rgba(240,196,111,0.1)',
    iconColor: '#f0c46f',
    title: 'Light & Dark Themes',
    description:
      'Switch seamlessly between light and dark modes. Carefully crafted color palettes for comfortable all-day use.',
  },
  {
    icon: <FolderKanban size={20} />,
    iconBg: 'rgba(107,161,241,0.1)',
    iconColor: '#6ba1f1',
    title: 'Multi-project Workflow',
    description:
      'Add projects by folder. See running indicators, git status badges, and change counts at a glance in the sidebar.',
  },
]

export function Features() {
  return (
    <section className="py-28" id="features">
      <div className="max-w-[1120px] mx-auto px-6">
        <p className="fade-up text-center text-[13px] font-semibold uppercase tracking-[2px] text-brand-blue mb-4">
          Features
        </p>
        <h2 className="fade-up text-center text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight mb-4">
          Everything you need, nothing you don't
        </h2>
        <p className="fade-up text-center text-base max-w-[480px] mx-auto mb-16" style={{ color: 'var(--text-secondary)' }}>
          Built for developers who juggle multiple projects daily.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="fade-up p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(107,161,241,0.2)'
                e.currentTarget.style.background = 'var(--bg-card-hover)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-primary)'
                e.currentTarget.style.background = 'var(--bg-card)'
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: f.iconBg, color: f.iconColor }}
              >
                {f.icon}
              </div>
              <h3 className="text-[17px] font-bold tracking-tight mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
