import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../context/theme-context'

const modes = [
  { value: 'light' as const, icon: Sun, label: 'Light' },
  { value: 'dark' as const, icon: Moon, label: 'Dark' },
  { value: 'system' as const, icon: Monitor, label: 'System' },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className="flex items-center rounded-full p-1 gap-0.5"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}
    >
      {modes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          title={label}
          className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 cursor-pointer"
          style={{
            background: theme === value ? 'var(--bg-card)' : 'transparent',
            boxShadow: theme === value ? 'var(--shadow-card)' : 'none',
            color: theme === value ? 'var(--text-primary)' : 'var(--text-tertiary)',
          }}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  )
}
