import { PREVIEW_COLORS as C, type PreviewView } from './preview-constants'

/* Reusable inline SVG icons matching Lucide originals at preview scale */
const ChevronDown = ({ size = 14, color = C.textPrimary }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
)
const ChevronRight = ({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)
const FolderIcon = ({ color = C.accentBlue, opacity = 1 }: { color?: string; opacity?: number }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
    <path d="M20 20a2 2 0 002-2V8a2 2 0 00-2-2h-7.9a2 2 0 01-1.69-.9L9.6 3.9A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z" />
  </svg>
)
const TerminalIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
)
const LayoutGridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)
const GitBranchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 01-9 9" />
  </svg>
)
const GripVerticalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" opacity={0.35}>
    <circle cx="9" cy="5" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="19" r="1" /><circle cx="15" cy="5" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="19" r="1" />
  </svg>
)

interface Props {
  activeView: PreviewView
  onViewChange: (view: PreviewView) => void
}

export function PreviewSidebar({ activeView, onViewChange }: Props) {
  return (
    <div
      className="w-[200px] max-md:w-[160px] shrink-0 flex flex-col text-[11px] overflow-hidden select-none"
      style={{ background: C.bgSidebar, borderRight: `1px solid ${C.border}` }}
    >
      {/* Header — matches real app: "Projects" + add button, pt-8 for macOS titlebar */}
      <div
        className="flex items-center justify-between px-3 pt-8 pb-2"
        style={{ borderBottom: `1px solid ${C.border}` }}
      >
        <span className="text-xs font-semibold" style={{ color: C.textPrimary }}>Projects</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 10v6M9 13h6M20 20a2 2 0 002-2V8a2 2 0 00-2-2h-7.9a2 2 0 01-1.69-.9L9.6 3.9A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Project list */}
      <div className="flex-1 overflow-hidden px-1 pt-1">
        {/* Active project: termoras — with drag handle, chevron, folder, name, git badge, count */}
        <div
          className="flex items-center gap-1 px-1.5 py-1.5 rounded cursor-pointer"
          style={{
            background: C.bgActive,
            borderLeft: `3px solid ${C.accentBlue}`,
            boxShadow: `0 0 8px ${C.glowColor}`,
          }}
        >
          <GripVerticalIcon />
          <ChevronDown />
          <FolderIcon />
          <span className="truncate text-[11px]" style={{ color: C.textPrimary }}>termoras</span>
          <span className="ml-auto text-[9px] font-bold" style={{ color: C.accentRed, opacity: 0.7 }}>git</span>
          <span
            className="text-[9px] font-medium px-1 rounded-full"
            style={{ background: 'rgba(240,111,111,0.15)', color: C.accentRed }}
          >
            3
          </span>
        </div>

        {/* Sub-items — indented to match real app (ml-10 scaled from ml-16) */}
        <div className="ml-10 max-md:ml-8">
          {/* Board */}
          <button
            onClick={() => onViewChange('kanban')}
            className="w-full flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer text-left"
            style={{
              color: activeView === 'kanban' ? C.accentBlue : C.textPrimary,
              background: activeView === 'kanban' ? 'rgba(107,161,241,0.08)' : 'transparent',
              boxShadow: activeView === 'kanban' ? `0 0 8px ${C.glowColor}` : 'none',
            }}
          >
            <LayoutGridIcon />
            <span className="text-[11px]">Board</span>
          </button>

          {/* Changes */}
          <button
            onClick={() => onViewChange('git')}
            className="w-full flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer text-left"
            style={{
              color: activeView === 'git' ? C.accentBlue : C.textPrimary,
              background: activeView === 'git' ? 'rgba(107,161,241,0.08)' : 'transparent',
              boxShadow: activeView === 'git' ? `0 0 8px ${C.glowColor}` : 'none',
            }}
          >
            <GitBranchIcon />
            <span className="text-[11px]">Changes</span>
            <span
              className="ml-auto text-[8px] font-medium px-1 rounded-full"
              style={{ background: 'rgba(240,111,111,0.15)', color: C.accentRed }}
            >
              3
            </span>
          </button>

          {/* Terminal 1 — running (green dot) */}
          <button
            onClick={() => onViewChange('terminal')}
            className="w-full flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer text-left"
            style={{
              color: activeView === 'terminal' ? C.accentBlue : C.textPrimary,
              background: activeView === 'terminal' ? 'rgba(107,161,241,0.08)' : 'transparent',
              boxShadow: activeView === 'terminal' ? `0 0 8px ${C.glowColor}` : 'none',
            }}
          >
            {/* Running indicator — green dot */}
            <span className="shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: C.accentGreen }} />
            <TerminalIcon />
            <span className="text-[11px]">Terminal 1</span>
          </button>

          {/* Terminal 2 — idle (gray dot) */}
          <button
            onClick={() => onViewChange('terminal')}
            className="w-full flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer text-left"
            style={{ color: C.textPrimary }}
          >
            {/* Idle indicator — gray dot */}
            <span className="shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: `${C.textSecondary}4d` }} />
            <TerminalIcon />
            <span className="text-[11px]">Terminal 2</span>
          </button>
        </div>

        {/* Other projects — collapsed */}
        {['my-api', 'landing-page'].map((name) => (
          <div
            key={name}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded mt-0.5"
            style={{ color: C.textSecondary }}
          >
            <ChevronRight />
            <FolderIcon color={C.accentBlue} opacity={0.5} />
            <span className="text-[11px] truncate">{name}</span>
          </div>
        ))}
      </div>

      {/* Footer — matches real app: TerminalStatusButton + ThemeToggle pill + Settings */}
      <div
        className="flex items-center justify-center gap-1.5 px-2 py-2"
        style={{ borderTop: `1px solid ${C.border}` }}
      >
        {/* Terminal status button — Terminal icon + count + green dot */}
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-md" style={{ color: C.textSecondary }}>
          <TerminalIcon size={13} />
          <span className="text-[10px] font-medium">1/3</span>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.accentGreen }} />
        </div>

        {/* Theme toggle — 3-button pill group matching ThemeToggle component */}
        <div className="flex items-center gap-0.5 rounded-md p-0.5" style={{ background: C.bgActive }}>
          {/* Sun (inactive) */}
          <div className="p-0.5 rounded" style={{ color: C.textSecondary }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          </div>
          {/* Moon (active — blue + elevated bg) */}
          <div className="p-0.5 rounded" style={{ background: C.bgPrimary, color: C.accentBlue, boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 009 9 9 9 0 11-9-9z" />
            </svg>
          </div>
          {/* Monitor (inactive) */}
          <div className="p-0.5 rounded" style={{ color: C.textSecondary }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
        </div>

        {/* Settings */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" /><circle cx="12" cy="12" r="3" />
        </svg>
      </div>
    </div>
  )
}
