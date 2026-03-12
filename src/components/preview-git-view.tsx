import { PREVIEW_COLORS as C } from './preview-constants'

const GIT_FILES = [
  { name: 'src/kanban/board.tsx', status: 'M', label: 'Modified', statusColor: C.accentBlue },
  { name: 'src/kanban/card.tsx', status: 'A', label: 'Added', statusColor: C.accentGreen },
  { name: 'src/git/diff.tsx', status: 'M', label: 'Modified', statusColor: C.accentBlue },
]

const DIFF_LINES = [
  { text: '@@ -12,6 +12,14 @@ export function Board()', type: 'meta' },
  { text: '   const [cols, setCols] = useState([])', type: 'ctx' },
  { text: '   const [drag, setDrag] = useState(null)', type: 'ctx' },
  { text: '+  const sensors = useSensors(', type: 'add' },
  { text: '+    useSensor(PointerSensor)', type: 'add' },
  { text: '+  )', type: 'add' },
  { text: '   return (', type: 'ctx' },
  { text: '-    <div className="board">', type: 'del' },
  { text: '+    <DndContext sensors={sensors}>', type: 'add' },
  { text: '       {cols.map(renderCol)}', type: 'ctx' },
]

export function GitView() {
  return (
    <div className="flex-1 flex overflow-hidden" style={{ background: C.bgPrimary }}>
      {/* File list panel — matches real app with branch badge, sections, commit/push */}
      <div
        className="w-[180px] max-md:w-[140px] shrink-0 flex flex-col overflow-hidden"
        style={{ background: C.bgSidebar, borderRight: `1px solid ${C.border}` }}
      >
        {/* Branch badge header */}
        <div className="flex items-center justify-between px-2.5 py-2" style={{ borderBottom: `1px solid ${C.border}` }}>
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-semibold"
            style={{ background: 'rgba(107,161,241,0.1)', color: C.accentBlue }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 01-9 9" />
            </svg>
            feat/kanban-dnd
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2" />
          </svg>
        </div>

        {/* File list */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between px-2.5 py-1">
            <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: C.textSecondary }}>
              Changes (3)
            </span>
          </div>
          {GIT_FILES.map((f) => (
            <div key={f.name} className="flex items-center gap-1.5 px-2 py-1" style={{ color: C.textSecondary }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="text-[9px] font-mono truncate flex-1">{f.name.split('/').pop()}</span>
              <span
                className="text-[8px] font-semibold px-1 py-0.5 rounded shrink-0"
                style={{ background: `${f.statusColor}1f`, color: f.statusColor }}
              >
                {f.label}
              </span>
            </div>
          ))}
        </div>

        {/* Commit/Push action bar */}
        <div className="p-2 space-y-1" style={{ borderTop: `1px solid ${C.border}` }}>
          <div
            className="text-[9px] px-2 py-1 rounded"
            style={{ border: `1px solid ${C.border}`, background: C.bgPrimary, color: C.textSecondary }}
          >
            Commit message...
          </div>
          <div className="flex gap-1">
            <div
              className="flex-1 flex items-center justify-center gap-1 text-[9px] font-medium py-1 rounded"
              style={{ background: 'rgba(107,161,241,0.15)', color: C.accentBlue }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Commit
            </div>
            <div
              className="flex-1 flex items-center justify-center gap-1 text-[9px] font-medium py-1 rounded"
              style={{ background: 'rgba(240,111,111,0.15)', color: C.accentRed }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              Push
            </div>
          </div>
        </div>
      </div>

      {/* Diff panel */}
      <div className="flex-1 p-3 font-mono text-[10px] leading-[1.8] overflow-hidden">
        <div className="text-[9px] mb-2 truncate" style={{ color: C.textSecondary }}>
          src/kanban/board.tsx
        </div>
        {DIFF_LINES.map((line, i) => (
          <div
            key={i}
            className="px-2 rounded"
            style={{
              color:
                line.type === 'add' ? C.accentGreen
                : line.type === 'del' ? C.accentRed
                : line.type === 'meta' ? C.accentBlue
                : C.textSecondary,
              background:
                line.type === 'add' ? 'rgba(94,196,168,0.08)'
                : line.type === 'del' ? 'rgba(240,111,111,0.08)'
                : 'transparent',
            }}
          >
            {line.type === 'add' ? '+ ' : line.type === 'del' ? '- ' : '  '}
            {line.text}
          </div>
        ))}
      </div>
    </div>
  )
}
