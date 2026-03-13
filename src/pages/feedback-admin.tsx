import { useState, useEffect, useCallback } from 'react'
import { LogIn, LogOut, Trash2, CheckCircle, Clock, Star, RefreshCw, AlertCircle } from 'lucide-react'
import {
  supabase,
  signIn,
  signOut,
  fetchFeedbacks,
  updateFeedbackStatus,
  deleteFeedback,
  type FeedbackRow,
  type FeedbackStatus,
} from '../lib/supabase'

type Filter = 'all' | FeedbackStatus

export function FeedbackAdmin() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [feedbacks, setFeedbacks] = useState<FeedbackRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  // Check auth state on mount
  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const loadFeedbacks = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchFeedbacks()
      setFeedbacks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load feedbacks')
    } finally {
      setLoading(false)
    }
  }, [])

  // Load feedbacks when authenticated
  useEffect(() => {
    if (user) loadFeedbacks()
  }, [user, loadFeedbacks])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    try {
      await signIn(email, password)
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoginLoading(false)
    }
  }

  async function handleToggleStatus(fb: FeedbackRow) {
    const newStatus: FeedbackStatus = fb.status === 'pending' ? 'resolved' : 'pending'
    setTogglingId(fb.id)
    try {
      await updateFeedbackStatus(fb.id, newStatus)
      setFeedbacks(prev => prev.map(f => f.id === fb.id ? { ...f, status: newStatus } : f))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setTogglingId(null)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this feedback?')) return
    setDeletingId(id)
    try {
      await deleteFeedback(id)
      setFeedbacks(prev => prev.filter(f => f.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = filter === 'all' ? feedbacks : feedbacks.filter(f => f.status === filter)
  const pendingCount = feedbacks.filter(f => f.status === 'pending').length
  const resolvedCount = feedbacks.filter(f => f.status === 'resolved').length

  // Auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="w-6 h-6 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Login form
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-primary)' }}>
        <div
          className="w-full max-w-sm rounded-2xl p-6"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-primary)',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <h1 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Feedback Admin
          </h1>
          <p className="text-xs mb-6" style={{ color: 'var(--text-tertiary)' }}>
            Sign in to manage feedbacks
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
              }}
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
              }}
            />

            {loginError && (
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                style={{
                  background: 'rgba(240,111,111,0.1)',
                  border: '1px solid rgba(240,111,111,0.2)',
                  color: '#f06f6f',
                }}
              >
                <AlertCircle size={14} />
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 btn-press cursor-pointer disabled:opacity-50"
              style={{
                background: 'linear-gradient(to bottom right, var(--color-brand-blue), var(--color-brand-green))',
                color: '#0a0b0f',
              }}
            >
              <LogIn size={15} />
              {loginLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-10 px-4 sm:px-6 py-4 flex items-center justify-between"
        style={{
          background: 'var(--bg-navbar)',
          borderBottom: '1px solid var(--border-primary)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div>
          <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            Feedback Manager
          </h1>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {user.email}
          </p>
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
          <button
            onClick={() => signOut()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-[var(--bg-tertiary)] cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats & Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {([
            { key: 'all' as Filter, label: 'All', count: feedbacks.length },
            { key: 'pending' as Filter, label: 'Pending', count: pendingCount },
            { key: 'resolved' as Filter, label: 'Resolved', count: resolvedCount },
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
            <AlertCircle size={14} />
            {error}
            <button onClick={() => setError('')} className="ml-auto underline cursor-pointer">
              Dismiss
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
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              {feedbacks.length === 0 ? 'No feedbacks yet.' : `No ${filter} feedbacks.`}
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
              {/* Top row: name, stars, date */}
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
                <span className="text-[10px] shrink-0" style={{ color: 'var(--text-muted)' }}>
                  {new Date(fb.created_at).toLocaleDateString('vi-VN', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </span>
              </div>

              {/* Message */}
              <p className="text-sm mb-3 whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
                {fb.message}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(fb)}
                  disabled={togglingId === fb.id}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-200 cursor-pointer disabled:opacity-50"
                  style={{
                    background: fb.status === 'resolved'
                      ? 'rgba(94,196,168,0.1)'
                      : 'rgba(240,196,111,0.1)',
                    color: fb.status === 'resolved' ? '#5ec4a8' : '#f0c46f',
                    border: `1px solid ${fb.status === 'resolved' ? 'rgba(94,196,168,0.2)' : 'rgba(240,196,111,0.2)'}`,
                  }}
                >
                  {fb.status === 'resolved'
                    ? <><CheckCircle size={12} /> Resolved</>
                    : <><Clock size={12} /> Pending</>
                  }
                </button>

                <button
                  onClick={() => handleDelete(fb.id)}
                  disabled={deletingId === fb.id}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 ml-auto"
                  style={{
                    background: 'rgba(240,111,111,0.1)',
                    color: '#f06f6f',
                    border: '1px solid rgba(240,111,111,0.2)',
                  }}
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
