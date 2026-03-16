import { useLanguage } from '../context/language-context'
import type { Language } from '../i18n/translations'

const langs: { value: Language; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'vi', label: 'VI' },
]

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className="flex items-center rounded-full p-1 gap-0.5"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}
    >
      {langs.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setLang(value)}
          title={label}
          className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 cursor-pointer text-xs font-bold"
          style={{
            background: lang === value ? 'var(--bg-card)' : 'transparent',
            boxShadow: lang === value ? 'var(--shadow-card)' : 'none',
            color: lang === value ? 'var(--text-primary)' : 'var(--text-tertiary)',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
