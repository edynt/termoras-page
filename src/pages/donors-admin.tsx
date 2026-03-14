import { useState, useEffect, useCallback } from 'react'
import { LogIn, LogOut, Trash2, Plus, RefreshCw, AlertCircle, Coffee, X } from 'lucide-react'
import {
  supabase,
  signIn,
  signOut,
  fetchDonations,
  insertDonation,
  deleteDonation,
  type DonationRow,
  type DonationCurrency,
} from '../lib/supabase'

export function DonorsAdmin() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [donations, setDonations] = useState<DonationRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Add form state
  const [showForm, setShowForm] = useState(false)
  const [formName, setFormName] = useState('')
  const [formAmount, setFormAmount] = useState('')
  const [formCurrency, setFormCurrency] = useState<DonationCurrency>('VND')
  const [formMessage, setFormMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!supabase) { setAuthLoading(false); return }
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const loadDonations = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setDonations(await fetchDonations())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (user) loadDonations()
  }, [user, loadDonations])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    try { await signIn(email, password) }
    catch (err) { setLoginError(err instanceof Error ? err.message : 'Login failed') }
    finally { setLoginLoading(false) }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await insertDonation({
        name: formName.trim(),
        amount: Number(formAmount),
        currency: formCurrency,
        message: formMessage.trim() || null,
      })
      setFormName('')
      setFormAmount('')
      setFormMessage('')
      setShowForm(false)
      await loadDonations()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this donation?')) return
    setDeletingId(id)
    try {
      await deleteDonation(id)
      setDonations(prev => prev.filter(d => d.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  function formatAmount(d: DonationRow) {
    if (d.currency === 'VND') return d.amount.toLocaleString('vi-VN') + 'đ'
    return '$' + d.amount.toLocaleString('en-US')
  }

  // Auth loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="w-6 h-6 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Login
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-primary)' }}>
        <div
          className="w-full max-w-sm rounded-2xl p-6"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-xl)' }}
        >
          <h1 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Donors Admin</h1>
          <p className="text-xs mb-6" style={{ color: 'var(--text-tertiary)' }}>Sign in to manage donations</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-primary)' }}
            />
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-primary)' }}
            />
            {loginError && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                style={{ background: 'rgba(240,111,111,0.1)', border: '1px solid rgba(240,111,111,0.2)', color: '#f06f6f' }}>
                <AlertCircle size={14} />{loginError}
              </div>
            )}
            <button
              type="submit" disabled={loginLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 btn-press cursor-pointer disabled:opacity-50"
              style={{ background: 'linear-gradient(to bottom right, var(--color-brand-blue), var(--color-brand-green))', color: '#0a0b0f' }}
            >
              <LogIn size={15} />{loginLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <header
        className="sticky top-0 z-10 px-4 sm:px-6 py-4 flex items-center justify-between"
        style={{ background: 'var(--bg-navbar)', borderBottom: '1px solid var(--border-primary)', backdropFilter: 'blur(20px)' }}
      >
        <div>
          <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Donors Manager</h1>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 btn-press cursor-pointer"
            style={{ background: 'linear-gradient(to bottom right, var(--color-brand-blue), var(--color-brand-green))', color: '#0a0b0f' }}
          >
            <Plus size={14} />Add Donation
          </button>
          <button
            onClick={loadDonations} disabled={loading}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)] cursor-pointer disabled:opacity-50"
            style={{ color: 'var(--text-secondary)' }} title="Refresh"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-[var(--bg-tertiary)] cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
          >
            <LogOut size={14} />Sign out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Add Donation Form */}
        {showForm && (
          <div
            className="rounded-xl p-5 mb-6"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Coffee size={15} />Add New Donation
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-[var(--bg-tertiary)] cursor-pointer"
                style={{ color: 'var(--text-tertiary)' }}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="grid sm:grid-cols-2 gap-3">
              <input
                value={formName} onChange={e => setFormName(e.target.value)} placeholder="Donor name" required
                className="px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-primary)' }}
              />
              <div className="flex gap-2">
                <input
                  type="number" min="1" value={formAmount} onChange={e => setFormAmount(e.target.value)} placeholder="Amount" required
                  className="flex-1 px-3.5 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-primary)' }}
                />
                <select
                  value={formCurrency} onChange={e => setFormCurrency(e.target.value as DonationCurrency)}
                  className="px-3 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-primary)' }}
                >
                  <option value="VND">VND</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <input
                value={formMessage} onChange={e => setFormMessage(e.target.value)} placeholder="Message (optional)"
                className="sm:col-span-2 px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-primary)' }}
              />
              <button
                type="submit" disabled={submitting}
                className="sm:col-span-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 btn-press cursor-pointer disabled:opacity-50"
                style={{ background: 'linear-gradient(to bottom right, var(--color-brand-blue), var(--color-brand-green))', color: '#0a0b0f' }}
              >
                <Plus size={15} />{submitting ? 'Adding...' : 'Add Donation'}
              </button>
            </form>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-xs"
            style={{ background: 'rgba(240,111,111,0.1)', border: '1px solid rgba(240,111,111,0.2)', color: '#f06f6f' }}>
            <AlertCircle size={14} />{error}
            <button onClick={() => setError('')} className="ml-auto underline cursor-pointer">Dismiss</button>
          </div>
        )}

        {/* Stats */}
        <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>
          {donations.length} donation{donations.length !== 1 ? 's' : ''} total
        </p>

        {/* Loading */}
        {loading && donations.length === 0 && (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty */}
        {!loading && donations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>No donations yet.</p>
          </div>
        )}

        {/* Donation list */}
        <div className="space-y-3">
          {donations.map(d => (
            <div
              key={d.id}
              className="rounded-xl p-4 flex items-start gap-3"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{d.name}</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-[11px] font-bold"
                    style={{ background: 'rgba(94,196,168,0.1)', color: '#5ec4a8', border: '1px solid rgba(94,196,168,0.2)' }}
                  >
                    {formatAmount(d)}
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {new Date(d.created_at).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </span>
                </div>
                {d.message && <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>"{d.message}"</p>}
              </div>
              <button
                onClick={() => handleDelete(d.id)} disabled={deletingId === d.id}
                className="p-2 rounded-lg transition-colors hover:bg-[rgba(240,111,111,0.1)] cursor-pointer disabled:opacity-50 shrink-0"
                style={{ color: '#f06f6f' }} title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
