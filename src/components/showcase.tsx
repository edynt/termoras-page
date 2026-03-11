export function Showcase() {
  return (
    <section className="py-20 pb-28" id="showcase">
      <div className="max-w-[1120px] mx-auto px-6">
        <p className="fade-up text-center text-[13px] font-semibold uppercase tracking-[2px] text-brand-blue mb-4">
          Showcase
        </p>
        <h2 className="fade-up text-center text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight mb-4">
          Built for your <span className="gradient-text">daily workflow</span>
        </h2>
        <p className="fade-up text-center text-base max-w-[480px] mx-auto mb-16" style={{ color: 'var(--text-secondary)' }}>
          From terminal to task management to version control — all in one window.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16">
          {/* Kanban Card */}
          <div
            className="fade-up rounded-2xl overflow-hidden transition-all duration-300"
            style={{ border: '1px solid var(--border-primary)', background: 'var(--bg-card)' }}
          >
            <div
              className="p-6 flex items-center justify-center"
              style={{
                aspectRatio: '16/10',
                background:
                  'linear-gradient(145deg, rgba(167,139,250,0.05), rgba(107,161,241,0.05))',
              }}
            >
              <MiniKanban />
            </div>
            <div className="px-6 pb-6 pt-5">
              <h3 className="text-base font-bold mb-1.5">Kanban Board</h3>
              <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                Drag-and-drop task management with custom tags and colors. Plan, track, and ship
                features.
              </p>
            </div>
          </div>

          {/* Diff Card */}
          <div
            className="fade-up rounded-2xl overflow-hidden transition-all duration-300"
            style={{ border: '1px solid var(--border-primary)', background: 'var(--bg-card)' }}
          >
            <div
              className="p-6 flex items-center justify-center"
              style={{
                aspectRatio: '16/10',
                background:
                  'linear-gradient(145deg, rgba(240,111,111,0.05), rgba(94,196,168,0.05))',
              }}
            >
              <MiniDiff />
            </div>
            <div className="px-6 pb-6 pt-5">
              <h3 className="text-base font-bold mb-1.5">GitHub-style Diff Viewer</h3>
              <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                Review changes with line numbers, color-coded additions and deletions. Stage,
                commit, and push in one click.
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
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.03)' }}>
      <div
        className="text-[10px] font-bold uppercase tracking-wider mb-2 pb-1.5"
        style={{ color: titleColor, borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        {title}
      </div>
      {children}
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
      className="p-1.5 px-2 rounded-md text-[10px] text-[#7a7e8a] mb-1.5"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <span
        className="inline-block px-1.5 py-px rounded text-[8px] font-semibold mb-0.5"
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
      className="w-full font-mono text-[10px] leading-[1.8] rounded-lg p-3 overflow-hidden"
      style={{ background: 'rgba(0,0,0,0.2)' }}
    >
      <div className="text-[#79c0ff]">@@ -12,6 +12,8 @@</div>
      <div className="text-[#52555e]">
        &nbsp; import {'{'} useAppStore {'}'} from &quot;../stores&quot;;
      </div>
      <div className="text-[#52555e]">
        &nbsp; import {'{'} GitBranch {'}'} from &quot;lucide-react&quot;;
      </div>
      <div className="text-[#3fb950]">
        + import {'{'} Check {'}'} from &quot;lucide-react&quot;;
      </div>
      <div className="text-[#3fb950]">
        + import {'{'} toast {'}'} from &quot;../lib/toast&quot;;
      </div>
      <div className="text-[#52555e]">&nbsp;</div>
      <div className="text-[#f85149]">- const msg = &quot;initial commit&quot;;</div>
      <div className="text-[#3fb950]">+ const msg = commitInput.trim();</div>
      <div className="text-[#52555e]">&nbsp; await gitCommit(path, msg);</div>
    </div>
  )
}
