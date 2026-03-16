import { useLanguage } from '../context/language-context'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-10 text-center">
      <div className="section-separator mb-10" />
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="flex items-center justify-center gap-2.5 mb-3">
          <img src="/icons/128x128.png" alt="Termoras" width={20} height={20} className="w-5 h-5 rounded opacity-50" />
          <span className="text-sm font-semibold" style={{ color: 'var(--text-tertiary)' }}>
            Termoras
          </span>
        </div>
        <p className="text-[13px] mb-4" style={{ color: 'var(--text-muted)' }}>
          {t.footer.tagline}
        </p>
        <p className="text-[12px] mt-6" style={{ color: 'var(--text-muted)' }}>
          {t.footer.copy}
        </p>
      </div>
    </footer>
  )
}
