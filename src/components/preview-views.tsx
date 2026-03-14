import { PREVIEW_COLORS as C } from './preview-constants'

// Re-export GitView from its own module
export { GitView } from './preview-git-view'

// ─── Terminal View ────────────────────────────────────────────────────────────

export function TerminalView() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: C.bgPrimary }}>
      {/* Tab bar — matches real app's terminal tab UI */}
      <div
        className="flex items-center gap-0.5 px-2 py-1 shrink-0"
        style={{ borderBottom: `1px solid ${C.border}`, background: C.bgSidebar }}
      >
        {/* Active tab */}
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-medium"
          style={{ background: C.bgActive, color: C.textPrimary }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.accentGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          Terminal 1
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.5}>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        {/* Inactive tab */}
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px]"
          style={{ color: C.textSecondary }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          Terminal 2
        </div>
        {/* Add tab button */}
        <div className="ml-auto" style={{ color: C.textSecondary }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </div>

      {/* Terminal content */}
      <div
        className="flex-1 p-4 font-mono text-xs leading-[1.7] overflow-hidden"
        style={{ color: C.textDim }}
      >
        <div>
          <span style={{ color: C.accentGreen }}>~/termoras</span>{' '}
          <span style={{ color: C.textPrimary }}>npm run dev</span>
        </div>
        <div>&nbsp;</div>
        <div>&nbsp; VITE v6.3.1 ready in 280ms</div>
        <div>&nbsp;</div>
        <div>&nbsp; ➜ Local:&nbsp;&nbsp; http://localhost:1420/</div>
        <div>&nbsp; ➜ Network: http://192.168.1.5:1420/</div>
        <div>&nbsp;</div>
        <div>
          <span style={{ color: C.accentGreen }}>~/termoras</span>{' '}
          <span style={{ color: C.textPrimary }}>cargo build --release</span>
        </div>
        <div>&nbsp;&nbsp; Compiling termoras v0.1.0</div>
        <div style={{ color: C.accentGreen }}>&nbsp;&nbsp;&nbsp; Finished release [optimized] in 42.3s</div>
        <div>&nbsp;</div>
        <div>
          <span style={{ color: C.accentGreen }}>~/termoras</span>{' '}
          <span className="inline-block w-2 h-4 bg-brand-blue animate-blink align-text-bottom ml-0.5" />
        </div>
      </div>
    </div>
  )
}

// ─── Kanban View ──────────────────────────────────────────────────────────────

interface KanbanCard {
  content: string
  tag: string
  tagColor: string
  cmd: string
  /** Show "Running" badge on this card */
  running?: boolean
}

const KANBAN_COLS: { title: string; autoRun?: boolean; cards: KanbanCard[] }[] = [
  {
    title: 'Todo',
    cards: [
      { content: 'Add SSH key management', tag: 'feat', tagColor: C.accentBlue, cmd: '/cook Add SSH key mgmt' },
      { content: 'Fix scroll jitter on resize', tag: 'bug', tagColor: C.accentRed, cmd: '/fix scroll jitter...' },
    ],
  },
  {
    title: 'In Progress',
    cards: [
      { content: 'Kanban drag & drop', tag: 'feat', tagColor: C.accentBlue, cmd: '/cook kanban dnd...', running: true },
      { content: 'Update dependencies', tag: 'chore', tagColor: C.accentGreen, cmd: '/cook update deps...' },
    ],
  },
  {
    title: 'Done',
    autoRun: true,
    cards: [
      { content: 'Git diff viewer', tag: 'feat', tagColor: C.accentBlue, cmd: '/cook git diff viewer' },
      { content: 'Dark theme variables', tag: 'chore', tagColor: C.accentGreen, cmd: '/cook dark theme...' },
    ],
  },
]

export function KanbanView() {
  const totalCards = KANBAN_COLS.reduce((sum, col) => sum + col.cards.length, 0)

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: C.bgPrimary }}>
      {/* Board header — matches real app: blue badge + project name + stats + Add Column */}
      <div
        className="flex items-center gap-2 px-3 py-2 shrink-0"
        style={{ borderBottom: `1px solid ${C.border}` }}
      >
        <div
          className="w-5 h-5 rounded-md flex items-center justify-center"
          style={{ background: `${C.accentBlue}26` }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.accentBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
        <span className="text-[10px] font-semibold" style={{ color: C.textPrimary }}>termoras</span>
        <span className="text-[9px]" style={{ color: C.textSecondary }}>
          {KANBAN_COLS.length} columns · {totalCards} cards
        </span>
        <div className="flex-1" />
        <div
          className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-md"
          style={{ border: `1px solid ${C.border}`, color: C.textSecondary }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Column
        </div>
      </div>

      {/* Columns area */}
      <div className="flex-1 flex gap-2.5 p-3 overflow-hidden">
        {KANBAN_COLS.map((col) => (
          <div
            key={col.title}
            className="flex-1 flex flex-col gap-1.5 min-w-0 rounded-lg p-2"
            style={{ background: C.bgSidebar, border: `1px solid ${C.border}` }}
          >
            {/* Column header — title + auto-run zap + count */}
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[9px] font-semibold" style={{ color: C.textSecondary }}>
                {col.title}
              </span>
              {col.autoRun && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.accentGreen} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              )}
              <span
                className="text-[8px] px-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)', color: C.textSecondary }}
              >
                {col.cards.length}
              </span>
            </div>

            {/* Cards */}
            {col.cards.map((card) => (
              <div
                key={card.content}
                className="rounded-lg p-2"
                style={{
                  background: C.bgPrimary,
                  border: `1px solid ${card.running ? `${C.accentBlue}4d` : C.border}`,
                  boxShadow: card.running ? `0 0 6px ${C.accentBlue}1a` : 'none',
                }}
              >
                {/* Card header: tag selector + running badge / action icons */}
                <div className="flex items-center gap-1 mb-1">
                  {/* Tag selector badge — dot + label + chevron */}
                  <div
                    className="inline-flex items-center gap-0.5 text-[8px] font-semibold px-1.5 py-0.5 rounded-md"
                    style={{ background: `${card.tagColor}22`, color: card.tagColor }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: card.tagColor }} />
                    {card.tag}
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                  <div className="flex-1" />
                  {/* Running badge or faint action icons */}
                  {card.running ? (
                    <span
                      className="flex items-center gap-0.5 text-[7px] font-medium px-1 py-0.5 rounded-md animate-pulse"
                      style={{ background: `${C.accentBlue}1a`, color: C.accentBlue }}
                    >
                      {/* Spinner icon */}
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                      </svg>
                      Running
                    </span>
                  ) : (
                    /* Faint action icons — Play, Copy, Pencil, Trash */
                    <div className="flex items-center gap-0.5" style={{ opacity: 0.25 }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content text */}
                <div className="text-[9px] leading-snug mb-1" style={{ color: C.textPrimary }}>
                  {card.content}
                </div>

                {/* Command chip */}
                <div
                  className="text-[8px] font-mono px-1.5 py-0.5 rounded-md truncate"
                  style={{ background: C.bgHover, color: C.textSecondary }}
                >
                  {card.cmd}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Divider bar — matches real app's horizontal divider with drag handle pill */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{ borderTop: `1px solid ${C.border}`, background: C.bgSidebar, height: 14 }}
      >
        <div className="w-6 h-0.5 rounded-full" style={{ background: `${C.textSecondary}4d` }} />
      </div>

      {/* Mini terminal split at bottom */}
      <div
        className="px-3 py-1.5 font-mono text-[9px] leading-[1.8]"
        style={{ color: C.textDim }}
      >
        <span style={{ color: C.accentGreen }}>~/termoras</span>{' '}
        <span style={{ color: C.textPrimary }}>git checkout -b feat/kanban-dnd</span>
        <br />
        <span>Switched to a new branch &apos;feat/kanban-dnd&apos;</span>
      </div>
    </div>
  )
}
