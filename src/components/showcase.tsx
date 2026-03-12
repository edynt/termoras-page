import type { ReactNode } from 'react'

export function Showcase() {
  return (
    <section className="py-20 pb-28 relative" id="showcase">
      <div className="section-separator" />

      <div className="max-w-[1120px] mx-auto px-6 pt-20">
        <p className="fade-up text-center text-[13px] font-semibold uppercase tracking-[3px] text-brand-blue mb-4">
          Showcase
        </p>
        <h2 className="fade-up text-center text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight mb-4">
          Built for your <span className="gradient-text">daily workflow</span>
        </h2>
        <p
          className="fade-up text-center text-base max-w-[480px] mx-auto mb-16"
          style={{ color: 'var(--text-secondary)' }}
        >
          From terminal to task management to version control — all in one window.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Kanban Card */}
          <div
            className="fade-up stagger-1 glow-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] group"
            style={{
              border: '1px solid var(--border-primary)',
              background: 'var(--bg-card)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div
              className="relative p-6 flex items-center justify-center overflow-hidden"
              style={{ aspectRatio: '16/10' }}
            >
              {/* Ambient glow */}
              <div
                className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(145deg, rgba(167,139,250,0.06), rgba(107,161,241,0.06))',
                }}
              />
              <div className="relative w-full">
                <MiniKanban />
              </div>
            </div>
            <div
              className="px-6 pb-6 pt-5"
              style={{ borderTop: '1px solid var(--border-secondary)' }}
            >
              <h3 className="text-base font-bold mb-1.5">Kanban Board</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Drag-and-drop task management with custom tags, auto-run commands, and one-click execution. Plan and ship features alongside your terminal.
              </p>
            </div>
          </div>

          {/* Diff Card */}
          <div
            className="fade-up stagger-2 glow-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] group"
            style={{
              border: '1px solid var(--border-primary)',
              background: 'var(--bg-card)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div
              className="relative p-6 flex items-center justify-center overflow-hidden"
              style={{ aspectRatio: '16/10' }}
            >
              <div
                className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(145deg, rgba(240,111,111,0.06), rgba(94,196,168,0.06))',
                }}
              />
              <div className="relative w-full">
                <MiniDiff />
              </div>
            </div>
            <div
              className="px-6 pb-6 pt-5"
              style={{ borderTop: '1px solid var(--border-secondary)' }}
            >
              <h3 className="text-base font-bold mb-1.5">Diff Viewer</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Review file changes with syntax highlighting, line numbers, and split or unified view modes. Stage, commit, and push without leaving the app.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MiniKanban() {
  return (
    <div className="flex gap-3 w-full">
      <KanbanColumn title="Todo" titleColor="#7a7e8a">
        <KanbanCard tag="feat" tagColor="rgba(107,161,241,0.15)" tagText="#6ba1f1" text="Add dark mode" />
        <KanbanCard tag="bug" tagColor="rgba(240,111,111,0.15)" tagText="#f06f6f" text="Fix scroll" />
      </KanbanColumn>
      <KanbanColumn title="In Progress" titleColor="#6ba1f1">
        <KanbanCard tag="feat" tagColor="rgba(107,161,241,0.15)" tagText="#6ba1f1" text="Git push modal" />
      </KanbanColumn>
      <KanbanColumn title="Done" titleColor="#5ec4a8">
        <KanbanCard tag="feat" tagColor="rgba(107,161,241,0.15)" tagText="#6ba1f1" text="Diff viewer" />
        <KanbanCard tag="feat" tagColor="rgba(107,161,241,0.15)" tagText="#6ba1f1" text="Rename project" />
      </KanbanColumn>
    </div>
  )
}

function KanbanColumn({
  title,
  titleColor,
  children,
}: {
  title: string
  titleColor: string
  children: ReactNode
}) {
  return (
    <div className="flex-1 rounded-lg p-2.5" style={{ background: 'var(--bg-secondary)' }}>
      <div
        className="text-[10px] font-bold uppercase tracking-wider mb-2.5 pb-1.5"
        style={{ color: titleColor, borderBottom: '1px solid var(--border-primary)' }}
      >
        {title}
      </div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  )
}

function KanbanCard({
  tag,
  tagColor,
  tagText,
  text,
}: {
  tag: string
  tagColor: string
  tagText: string
  text: string
}) {
  return (
    <div
      className="p-2 px-2.5 rounded-md text-[10px]"
      style={{
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-secondary)',
        color: 'var(--text-secondary)',
      }}
    >
      <span
        className="inline-block px-1.5 py-px rounded text-[8px] font-semibold mb-1"
        style={{ background: tagColor, color: tagText }}
      >
        {tag}
      </span>
      <br />
      {text}
    </div>
  )
}

function MiniDiff() {
  return (
    <div
      className="w-full font-mono text-[10px] leading-[1.9] rounded-lg p-3.5 overflow-hidden"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}
    >
      <div className="text-[#79c0ff]">@@ -12,6 +12,8 @@</div>
      <div className="font-mono" style={{ color: 'var(--text-tertiary)' }}>
        &nbsp; import {'{'} useAppStore {'}'} from &quot;../stores&quot;;
      </div>
      <div className="font-mono" style={{ color: 'var(--text-tertiary)' }}>
        &nbsp; import {'{'} GitBranch {'}'} from &quot;lucide-react&quot;;
      </div>
      <div className="text-[#3fb950] bg-[rgba(63,185,80,0.06)] -mx-1 px-1 rounded-sm">
        + import {'{'} Check {'}'} from &quot;lucide-react&quot;;
      </div>
      <div className="text-[#3fb950] bg-[rgba(63,185,80,0.06)] -mx-1 px-1 rounded-sm">
        + import {'{'} toast {'}'} from &quot;../lib/toast&quot;;
      </div>
      <div className="font-mono" style={{ color: 'var(--text-tertiary)' }}>&nbsp;</div>
      <div className="text-[#f85149] bg-[rgba(248,81,73,0.06)] -mx-1 px-1 rounded-sm">
        - const msg = &quot;initial commit&quot;;
      </div>
      <div className="text-[#3fb950] bg-[rgba(63,185,80,0.06)] -mx-1 px-1 rounded-sm">
        + const msg = commitInput.trim();
      </div>
      <div className="font-mono" style={{ color: 'var(--text-tertiary)' }}>&nbsp; await gitCommit(path, msg);</div>
    </div>
  )
}
