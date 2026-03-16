import { useState, useEffect } from 'react'
import { Star, CheckCircle, Clock, MessageSquare, ArrowLeft, RefreshCw } from 'lucide-react'
import { fetchPublicFeedbacks, type FeedbackRow, type FeedbackStatus } from '../lib/supabase'
import { ThemeToggle } from '../components/theme-toggle'
import { LanguageToggle } from '../components/language-toggle'
import { useLanguage } from '../context/language-context'

type Filter = 'all' | FeedbackStatus

export function FeedbackPublic() {
  const { t } = useLanguage()
  const [feedbacks, setFeedbacks] = useState<FeedbackRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  async function loadFeedbacks() {
    setLoading(true)
    setError('')
    try {
      const data = await fetchPublicFeedbacks()
      setFeedbacks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load feedbacks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFeedbacks()
  }, [])

  const filtered = filter === 'all' ? feedbacks : feedbacks.filter(f => f.status === filter)
  const pendingCount = feedbacks.filter(f => f.status === 'pending').length
  const resolvedCount = feedbacks.filter(f => f.status === 'resolved').length
  const avgRating = feedbacks.length > 0
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : '0'

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-10 px-4 sm:px-6 py-4"
        style={{
          background: 'var(--bg-navbar)',
          borderBottom: '1px solid var(--border-primary)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                history.pushState(null, '', '/')
                window.dispatchEvent(new HashChangeEvent('hashchange'))
              }}
              className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]"
              style={{ color: 'var(--text-secondary)' }}
              title={t.feedbackPage.backToHome}
            >
              <ArrowLeft size={18} />
            </a>
            <div>
              <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                {t.feedbackPage.title}
              </h1>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                {t.feedbackPage.subtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadFeedbacks}
              disabled={loading}
              className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)] cursor-pointer disabled:opacity-50"
              style={{ color: 'var(--text-secondary)' }}
              title="Refresh"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: t.feedbackPage.total, value: feedbacks.length, icon: MessageSquare, color: 'var(--text-primary)' },
            { label: t.feedbackPage.avgRating, value: avgRating, icon: Star, color: '#f0c46f' },
            { label: t.feedbackPage.resolved, value: `${feedbacks.length > 0 ? Math.round((resolvedCount / feedbacks.length) * 100) : 0}%`, icon: CheckCircle, color: '#5ec4a8' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-xl p-4 text-center"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
              }}
            >
              <Icon size={18} className="mx-auto mb-2" style={{ color }} />
              <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</div>
              <div className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {([
            { key: 'all' as Filter, label: t.feedbackPage.filterAll, count: feedbacks.length },
            { key: 'pending' as Filter, label: t.feedbackPage.filterPending, count: pendingCount },
            { key: 'resolved' as Filter, label: t.feedbackPage.filterResolved, count: resolvedCount },
          ]).map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
              style={{
                background: filter === key
                  ? 'linear-gradient(to bottom right, var(--color-brand-blue), var(--color-brand-green))'
                  : 'var(--bg-secondary)',
                color: filter === key ? '#0a0b0f' : 'var(--text-secondary)',
                border: `1px solid ${filter === key ? 'transparent' : 'var(--border-primary)'}`,
              }}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-xs"
            style={{
              background: 'rgba(240,111,111,0.1)',
              border: '1px solid rgba(240,111,111,0.2)',
              color: '#f06f6f',
            }}
          >
            {error}
            <button onClick={() => setError('')} className="ml-auto underline cursor-pointer">
              {t.feedbackPage.dismiss}
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && feedbacks.length === 0 && (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare size={40} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              {feedbacks.length === 0
                ? t.feedbackPage.noFeedbacks
                : t.feedbackPage.noFiltered.replace('{filter}', filter)}
            </p>
          </div>
        )}

        {/* Feedback list */}
        <div className="space-y-3">
          {filtered.map(fb => (
            <div
              key={fb.id}
              className="rounded-xl p-4 transition-colors duration-200"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                    {fb.name}
                  </span>
                  <div className="flex shrink-0">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star
                        key={s}
                        size={12}
                        fill={s <= fb.rating ? '#f0c46f' : 'transparent'}
                        stroke={s <= fb.rating ? '#f0c46f' : 'var(--text-muted)'}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {/* Status badge */}
                  <span
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                    style={{
                      background: fb.status === 'resolved'
                        ? 'rgba(94,196,168,0.1)'
                        : 'rgba(240,196,111,0.1)',
                      color: fb.status === 'resolved' ? '#5ec4a8' : '#f0c46f',
                      border: `1px solid ${fb.status === 'resolved' ? 'rgba(94,196,168,0.2)' : 'rgba(240,196,111,0.2)'}`,
                    }}
                  >
                    {fb.status === 'resolved'
                      ? <><CheckCircle size={10} /> {t.feedbackPage.statusResolved}</>
                      : <><Clock size={10} /> {t.feedbackPage.statusPending}</>
                    }
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {new Date(fb.created_at).toLocaleDateString('vi-VN', {
                      day: '2-digit', month: '2-digit', year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Message */}
              <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
                {fb.message}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
