import { PREVIEW_COLORS as C } from './preview-constants'

// Re-export GitView from its own module
export { GitView } from './preview-git-view'

// ─── Terminal View ────────────────────────────────────────────────────────────

export function TerminalView() {
  return (
    <div
      className="flex-1 p-4 font-mono text-xs leading-[1.9] overflow-hidden"
      style={{ background: C.bgPrimary, color: C.textDim }}
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
  )
}

// ─── Kanban View ──────────────────────────────────────────────────────────────

const KANBAN_COLS = [
  {
    title: 'Todo',
    cards: [
      { title: 'Add SSH key mgmt', badge: 'feat', badgeColor: C.accentBlue, cmd: 'feat/ssh-keys' },
      { title: 'Fix scroll jitter', badge: 'bug', badgeColor: C.accentRed, cmd: 'bug/scroll' },
    ],
  },
  {
    title: 'In Progress',
    cards: [
      { title: 'Kanban drag & drop', badge: 'feat', badgeColor: C.accentBlue, cmd: 'feat/kanban-dnd' },
      { title: 'Update deps', badge: 'chore', badgeColor: C.accentGreen, cmd: 'chore/deps' },
    ],
  },
  {
    title: 'Done',
    cards: [
      { title: 'Git diff viewer', badge: 'feat', badgeColor: C.accentBlue, cmd: 'feat/git-diff' },
      { title: 'Dark theme vars', badge: 'chore', badgeColor: C.accentGreen, cmd: 'chore/theme' },
    ],
  },
]

export function KanbanView() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: C.bgPrimary }}>
      <div className="flex-1 flex gap-3 p-4 overflow-hidden">
        {KANBAN_COLS.map((col) => (
          <div key={col.title} className="flex-1 flex flex-col gap-2 min-w-0">
            <div className="text-[10px] font-semibold mb-1" style={{ color: C.textSecondary }}>
              {col.title}
              <span
                className="ml-1.5 text-[8px] px-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)', color: C.textSecondary }}
              >
                {col.cards.length}
              </span>
            </div>
            {col.cards.map((card) => (
              <div
                key={card.title}
                className="rounded-lg p-2.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}` }}
              >
                <div className="text-[10px] mb-1.5 leading-snug" style={{ color: C.textPrimary }}>
                  {card.title}
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-[8px] px-1.5 py-0.5 rounded font-semibold"
                    style={{ background: `${card.badgeColor}22`, color: card.badgeColor }}
                  >
                    {card.badge}
                  </span>
                  <span
                    className="text-[8px] px-1.5 py-0.5 rounded font-mono truncate"
                    style={{ background: 'rgba(255,255,255,0.04)', color: C.textSecondary }}
                  >
                    {card.cmd}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mini terminal split at bottom */}
      <div
        className="px-4 py-2 font-mono text-[10px] leading-[1.8]"
        style={{ borderTop: `1px solid ${C.border}`, color: C.textDim }}
      >
        <span style={{ color: C.accentGreen }}>~/termoras</span>{' '}
        <span style={{ color: C.textPrimary }}>git checkout -b feat/kanban-dnd</span>
        <br />
        <span>Switched to a new branch &apos;feat/kanban-dnd&apos;</span>
      </div>
    </div>
  )
}
