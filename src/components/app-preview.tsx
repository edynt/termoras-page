export function AppPreview() {
  return (
    <div className="fade-up relative mx-auto mt-20 max-w-[960px]">
      {/* Glow behind the preview */}
      <div
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, var(--glow-blue) 0%, transparent 60%)',
        }}
      />

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          border: '1px solid var(--border-primary)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div
          className="flex flex-col"
          style={{ aspectRatio: '16/10', background: 'var(--bg-preview-inner)' }}
        >
          {/* Titlebar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#f06f6f] transition-opacity hover:opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#f0c46f] transition-opacity hover:opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#5ec4a8] transition-opacity hover:opacity-80" />
            </div>
            <span className="flex-1 text-center text-xs text-[#52555e] font-medium">Termoras</span>
            <div className="w-12" />
          </div>

          {/* App layout */}
          <div className="flex flex-1">
            {/* Sidebar */}
            <div
              className="w-[220px] max-md:w-[160px] p-3"
              style={{
                background: 'rgba(255,255,255,0.015)',
                borderRight: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <SidebarItem active label="termoras" badge="3" />
              <div className="ml-5">
                <SidebarSubItem label="Board" color="rgba(167,139,250,0.25)" />
                <SidebarSubItem label="Changes" color="rgba(240,111,111,0.25)" badge="3" />
                <SidebarSubItem label="Terminal 1" color="rgba(94,196,168,0.25)" textColor="#5ec4a8" />
              </div>
              <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <SidebarItem label="my-api" />
                <SidebarItem label="landing-page" />
              </div>
            </div>

            {/* Terminal */}
            <div className="flex-1 p-4 overflow-hidden font-mono text-xs leading-[1.9] text-[#7a7e8a]">
              <div>
                <span className="text-[#5ec4a8]">~/termoras</span>{' '}
                <span className="text-[#e4e5e9]">npm run dev</span>
              </div>
              <div className="text-[#52555e]">&nbsp;</div>
              <div className="text-[#52555e]">&nbsp; VITE v6.3.1 ready in 280ms</div>
              <div className="text-[#52555e]">&nbsp;</div>
              <div className="text-[#52555e]">
                &nbsp; ➜ Local:&nbsp;&nbsp; http://localhost:1420/
              </div>
              <div className="text-[#52555e]">
                &nbsp; ➜ Network: http://192.168.1.5:1420/
              </div>
              <div className="text-[#52555e]">&nbsp;</div>
              <div>
                <span className="text-[#5ec4a8]">~/termoras</span>{' '}
                <span className="text-[#e4e5e9]">cargo build --release</span>
              </div>
              <div className="text-[#52555e]">&nbsp;&nbsp; Compiling termoras v0.1.0</div>
              <div className="text-[#5ec4a8]">
                &nbsp;&nbsp;&nbsp; Finished release [optimized] target(s) in 42.3s
              </div>
              <div className="text-[#52555e]">&nbsp;</div>
              <div>
                <span className="text-[#5ec4a8]">~/termoras</span>{' '}
                <span className="inline-block w-2 h-4 bg-brand-blue animate-blink align-text-bottom ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarItem({
  label,
  active,
  badge,
}: {
  label: string
  active?: boolean
  badge?: string
}) {
  return (
    <div
      className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs mb-1 transition-colors"
      style={{
        background: active ? 'rgba(107,161,241,0.1)' : 'transparent',
        color: active ? '#6ba1f1' : '#7a7e8a',
        borderLeft: active ? '3px solid #6ba1f1' : '3px solid transparent',
      }}
    >
      <div
        className="w-3.5 h-3.5 rounded-[3px]"
        style={{ background: active ? 'rgba(107,161,241,0.3)' : 'rgba(107,161,241,0.15)' }}
      />
      {label}
      {badge && (
        <span className="ml-auto text-[9px] font-bold px-1.5 rounded-full bg-[rgba(240,111,111,0.15)] text-[#f06f6f]">
          {badge}
        </span>
      )}
    </div>
  )
}

function SidebarSubItem({
  label,
  color,
  badge,
  textColor,
}: {
  label: string
  color: string
  badge?: string
  textColor?: string
}) {
  return (
    <div
      className="flex items-center gap-2 px-2.5 py-1 text-[11px]"
      style={{ color: textColor ?? '#7a7e8a' }}
    >
      <div className="w-2.5 h-2.5 rounded-[2px]" style={{ background: color }} />
      {label}
      {badge && (
        <span className="ml-auto text-[8px] font-bold px-1 rounded-full bg-[rgba(240,111,111,0.15)] text-[#f06f6f]">
          {badge}
        </span>
      )}
    </div>
  )
}
