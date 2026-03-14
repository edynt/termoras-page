import { PREVIEW_COLORS as C } from './preview-constants'

/* Staged files and changed files — split into two sections matching real app */
const STAGED_FILES = [
  { name: 'board.tsx', path: 'src/kanban/', status: 'M', label: 'Modified', statusColor: C.accentBlue },
]

const CHANGED_FILES = [
  { name: 'card.tsx', path: 'src/kanban/', status: 'A', label: 'Added', statusColor: C.accentGreen },
  { name: 'diff.tsx', path: 'src/git/', status: 'M', label: 'Modified', statusColor: C.accentBlue },
]

const DIFF_LINES: { text: string; type: 'meta' | 'ctx' | 'add' | 'del'; oldLn?: string; newLn?: string }[] = [
  { text: '@@ -12,6 +12,14 @@ export function Board()', type: 'meta' },
  { text: '  const [cols, setCols] = useState([])', type: 'ctx', oldLn: '12', newLn: '12' },
  { text: '  const [drag, setDrag] = useState(null)', type: 'ctx', oldLn: '13', newLn: '13' },
  { text: '  const sensors = useSensors(', type: 'add', newLn: '14' },
  { text: '    useSensor(PointerSensor)', type: 'add', newLn: '15' },
  { text: '  )', type: 'add', newLn: '16' },
  { text: '  return (', type: 'ctx', oldLn: '14', newLn: '17' },
  { text: '    <div className="board">', type: 'del', oldLn: '15' },
  { text: '    <DndContext sensors={sensors}>', type: 'add', newLn: '18' },
  { text: '      {cols.map(renderCol)}', type: 'ctx', oldLn: '16', newLn: '19' },
]

/* Small file icon for file list */
const FileIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
  </svg>
)

export function GitView() {
  return (
    <div className="flex-1 flex overflow-hidden" style={{ background: C.bgPrimary }}>
      {/* File list panel — matches real app with branch badge, staged/changes sections, commit/push/undo */}
      <div
        className="w-[180px] max-md:w-[140px] shrink-0 flex flex-col overflow-hidden"
        style={{ background: C.bgSidebar, borderRight: `1px solid ${C.border}` }}
      >
        {/* Branch badge header + fetch */}
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
          {/* Fetch / refresh icon */}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2" />
          </svg>
        </div>

        {/* File list with sections */}
        <div className="flex-1 overflow-hidden">
          {/* Staged section */}
          <div className="flex items-center justify-between px-2.5 py-1">
            <span className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: C.accentGreen }}>
              Staged ({STAGED_FILES.length})
            </span>
            {/* Unstage all icon (minus) */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.5}>
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          {STAGED_FILES.map((f) => (
            <div key={f.name} className="flex items-center gap-1 px-2 py-0.5" style={{ color: C.textSecondary }}>
              <FileIcon />
              <span className="text-[9px] font-mono truncate flex-1">{f.name}</span>
              <span
                className="text-[7px] font-semibold px-1 py-0.5 rounded shrink-0"
                style={{ background: `${f.statusColor}1f`, color: f.statusColor }}
              >
                {f.label}
              </span>
            </div>
          ))}

          {/* Changes section */}
          <div className="flex items-center justify-between px-2.5 py-1 mt-1">
            <span className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: C.textSecondary }}>
              Changes ({CHANGED_FILES.length})
            </span>
            {/* Stage all icon (plus) */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.5}>
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          {CHANGED_FILES.map((f) => (
            <div key={f.name} className="flex items-center gap-1 px-2 py-0.5" style={{ color: C.textSecondary }}>
              <FileIcon />
              <span className="text-[9px] font-mono truncate flex-1">{f.name}</span>
              <span
                className="text-[7px] font-semibold px-1 py-0.5 rounded shrink-0"
                style={{ background: `${f.statusColor}1f`, color: f.statusColor }}
              >
                {f.label}
              </span>
            </div>
          ))}
        </div>

        {/* Summary footer — colored stats */}
        <div
          className="px-2.5 py-1 text-[8px]"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <span style={{ color: C.accentGreen }}>1 staged</span>
          <span style={{ color: C.textSecondary }}> · </span>
          <span style={{ color: C.accentBlue }}>1 modified</span>
          <span style={{ color: C.textSecondary }}> · </span>
          <span style={{ color: C.accentGreen }}>1 new</span>
        </div>

        {/* Commit/Push/Undo action bar */}
        <div className="p-2 space-y-1" style={{ borderTop: `1px solid ${C.border}` }}>
          <div
            className="text-[9px] px-2 py-1 rounded"
            style={{ border: `1px solid ${C.border}`, background: C.bgPrimary, color: C.textSecondary }}
          >
            Commit message...
          </div>
          <div className="flex gap-1">
            {/* Commit button */}
            <div
              className="flex-1 flex items-center justify-center gap-0.5 text-[8px] font-medium py-1 rounded"
              style={{ background: 'rgba(107,161,241,0.15)', color: C.accentBlue }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Commit
            </div>
            {/* Push button */}
            <div
              className="flex-1 flex items-center justify-center gap-0.5 text-[8px] font-medium py-1 rounded"
              style={{ background: 'rgba(240,111,111,0.15)', color: C.accentRed }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              Push
            </div>
            {/* Undo button */}
            <div
              className="flex items-center justify-center px-1.5 py-1 rounded"
              style={{ background: 'rgba(255,255,255,0.04)', color: C.textSecondary }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7v6h6" /><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Diff panel — with line numbers and view mode toggle */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Diff header — file path + Split/Unified toggle */}
        <div
          className="flex items-center justify-between px-3 py-1.5 shrink-0"
          style={{ borderBottom: `1px solid ${C.border}` }}
        >
          <span className="text-[9px] font-mono truncate" style={{ color: C.textSecondary }}>
            src/kanban/board.tsx
          </span>
          <div
            className="flex items-center gap-1 text-[8px] font-medium px-1.5 py-0.5 rounded-md"
            style={{ border: `1px solid ${C.border}`, color: C.textSecondary }}
          >
            {/* Columns icon for split view */}
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="3" x2="12" y2="21" />
            </svg>
            Split
          </div>
        </div>

        {/* Diff lines with line numbers */}
        <div className="flex-1 font-mono text-[9px] leading-[1.8] overflow-hidden p-1">
          {DIFF_LINES.map((line, i) => (
            <div
              key={i}
              className="flex rounded"
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
              {/* Old line number */}
              <span
                className="w-6 text-right pr-1 shrink-0 select-none"
                style={{ color: `${C.textSecondary}66` }}
              >
                {line.type === 'meta' ? '' : (line.oldLn ?? '')}
              </span>
              {/* New line number */}
              <span
                className="w-6 text-right pr-1.5 shrink-0 select-none"
                style={{ color: `${C.textSecondary}66` }}
              >
                {line.type === 'meta' ? '' : (line.newLn ?? '')}
              </span>
              {/* +/- marker + content */}
              <span className="px-1">
                {line.type === 'add' ? '+ ' : line.type === 'del' ? '- ' : '  '}
                {line.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
