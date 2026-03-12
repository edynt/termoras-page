import { PREVIEW_COLORS as C, type PreviewView } from './preview-constants'

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
      {/* Header — matches real app: "Projects" + add button */}
      <div
        className="flex items-center justify-between px-3 pt-6 pb-2"
        style={{ borderBottom: `1px solid ${C.border}` }}
      >
        <span className="text-xs font-semibold" style={{ color: C.textPrimary }}>Projects</span>
        {/* FolderPlus icon (simplified SVG) */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 10v6M9 13h6M20 20a2 2 0 002-2V8a2 2 0 00-2-2h-7.9a2 2 0 01-1.69-.9L9.6 3.9A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Project list */}
      <div className="flex-1 overflow-hidden px-1 pt-1">
        {/* Active project: termoras */}
        <div
          className="flex items-center gap-1.5 px-2 py-1.5 rounded cursor-pointer"
          style={{
            background: C.bgActive,
            borderLeft: `3px solid ${C.accentBlue}`,
            boxShadow: `0 0 8px ${C.glowColor}`,
          }}
        >
          {/* Chevron down */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
          {/* Folder icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.accentBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 20a2 2 0 002-2V8a2 2 0 00-2-2h-7.9a2 2 0 01-1.69-.9L9.6 3.9A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z" />
          </svg>
          <span className="truncate text-[11px]" style={{ color: C.textPrimary }}>termoras</span>
          <span className="ml-auto text-[9px] font-bold" style={{ color: C.accentRed, opacity: 0.7 }}>git</span>
          <span
            className="text-[9px] font-medium px-1 rounded-full"
            style={{ background: 'rgba(240,111,111,0.15)', color: C.accentRed }}
          >
            3
          </span>
        </div>

        {/* Sub-items — indented like real app (ml-7) */}
        <div className="ml-7">
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
            {/* LayoutGrid icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
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
            {/* GitBranch icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 01-9 9" />
            </svg>
            <span className="text-[11px]">Changes</span>
            <span
              className="ml-auto text-[8px] font-medium px-1 rounded-full"
              style={{ background: 'rgba(240,111,111,0.15)', color: C.accentRed }}
            >
              3
            </span>
          </button>

          {/* Terminal 1 */}
          <button
            onClick={() => onViewChange('terminal')}
            className="w-full flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer text-left"
            style={{
              color: activeView === 'terminal' ? C.accentGreen : C.textPrimary,
              background: activeView === 'terminal' ? 'rgba(107,161,241,0.08)' : 'transparent',
              boxShadow: activeView === 'terminal' ? `0 0 8px ${C.glowColor}` : 'none',
            }}
          >
            {/* Terminal icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            <span className="text-[11px]">Terminal 1</span>
          </button>
        </div>

        {/* Other projects — collapsed */}
        {['my-api', 'landing-page'].map((name) => (
          <div
            key={name}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded mt-0.5"
            style={{ color: C.textSecondary }}
          >
            {/* Chevron right */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
            {/* Folder icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.accentBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.5}>
              <path d="M20 20a2 2 0 002-2V8a2 2 0 00-2-2h-7.9a2 2 0 01-1.69-.9L9.6 3.9A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z" />
            </svg>
            <span className="text-[11px] truncate">{name}</span>
          </div>
        ))}
      </div>

      {/* Footer — matches real app: terminal status, theme, settings */}
      <div
        className="flex items-center justify-center gap-2 px-2 py-2"
        style={{ borderTop: `1px solid ${C.border}` }}
      >
        {/* Terminal status */}
        <span className="text-[10px] font-mono" style={{ color: C.textSecondary }}>
          &gt;_ 0/2
        </span>
        {/* Theme icons (sun, moon, monitor) */}
        <div className="flex items-center gap-1">
          {/* Sun */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
          {/* Moon */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.accentBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 009 9 9 9 0 11-9-9z" />
          </svg>
          {/* Monitor */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        {/* Settings */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" /><circle cx="12" cy="12" r="3" />
        </svg>
      </div>
    </div>
  )
}
