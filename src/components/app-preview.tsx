import { useCallback, useEffect, useRef, useState } from 'react'
import { PreviewSidebar } from './preview-sidebar'
import { GitView, KanbanView, TerminalView } from './preview-views'
import { PREVIEW_COLORS as C, type PreviewView } from './preview-constants'

const VIEWS: PreviewView[] = ['kanban', 'git', 'terminal']
const ROTATE_MS = 5000

export function AppPreview() {
  const [active, setActive] = useState<PreviewView>('terminal')
  const [fading, setFading] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const transitionTo = useCallback((next: PreviewView | ((cur: PreviewView) => PreviewView)) => {
    setFading(true)
    timeoutRef.current = setTimeout(() => {
      setActive(next)
      setFading(false)
    }, 220)
  }, [])

  const startRotation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    intervalRef.current = setInterval(() => {
      transitionTo((cur) => {
        const idx = VIEWS.indexOf(cur)
        return VIEWS[(idx + 1) % VIEWS.length]
      })
    }, ROTATE_MS)
  }, [transitionTo])

  useEffect(() => {
    startRotation()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [startRotation])

  function handleViewChange(view: PreviewView) {
    if (view === active) return
    transitionTo(view)
    startRotation()
  }

  return (
    <div className="fade-up relative mx-auto mt-20 max-w-[960px]">
      {/* Glow behind the preview */}
      <div
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, var(--glow-blue) 0%, transparent 60%)' }}
      />

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-xl)' }}
      >
        <div className="flex flex-col" style={{ aspectRatio: '16/10', background: C.bgPrimary }}>
          {/* macOS titlebar — matches real app (no tabs, just traffic lights + title) */}
          <div
            className="flex items-center px-4 py-2.5 shrink-0"
            style={{ background: C.bgSidebar, borderBottom: `1px solid ${C.border}` }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#f06f6f]" />
              <div className="w-3 h-3 rounded-full bg-[#f0c46f]" />
              <div className="w-3 h-3 rounded-full bg-[#5ec4a8]" />
            </div>
            <span className="flex-1 text-center text-xs font-medium" style={{ color: '#3a4a5a' }}>
              Termoras
            </span>
            <div className="w-12" />
          </div>

          {/* App layout: sidebar + content */}
          <div className="flex flex-1 overflow-hidden">
            <PreviewSidebar activeView={active} onViewChange={handleViewChange} />

            {/* Content pane with crossfade */}
            <div
              className="flex-1 flex overflow-hidden"
              style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.22s ease' }}
            >
              {active === 'terminal' && <TerminalView />}
              {active === 'kanban' && <KanbanView />}
              {active === 'git' && <GitView />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
