import { useState, useEffect } from 'react'
import { Heart, Trophy, ArrowLeft, RefreshCw, Coffee } from 'lucide-react'
import { fetchPublicDonations, type DonationRow } from '../lib/supabase'
import { ThemeToggle } from '../components/theme-toggle'

function formatAmount(d: DonationRow) {
  if (d.currency === 'VND') return d.amount.toLocaleString('vi-VN') + 'đ'
  return '$' + d.amount.toLocaleString('en-US')
}

/** Normalize to USD for ranking (rough 1 USD = 25,000 VND) */
function toUsd(d: DonationRow) {
  return d.currency === 'VND' ? d.amount / 25_000 : d.amount
}

export function DonorsPublic() {
  const [donations, setDonations] = useState<DonationRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    setError('')
    try {
      setDonations(await fetchPublicDonations())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  // Aggregate total per donor name and rank
  const aggregated = donations.reduce<Record<string, { name: string; totalUsd: number; count: number }>>((acc, d) => {
    const key = d.name.toLowerCase().trim()
    if (!acc[key]) acc[key] = { name: d.name, totalUsd: 0, count: 0 }
    acc[key].totalUsd += toUsd(d)
    acc[key].count += 1
    return acc
  }, {})
  const topDonors = Object.values(aggregated)
    .sort((a, b) => b.totalUsd - a.totalUsd)
    .slice(0, 10)

  const totalUsd = donations.reduce((sum, d) => sum + toUsd(d), 0)

  const medalColors = ['#f0c46f', '#b0b0b0', '#cd7f32']

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
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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
              title="Back to home"
            >
              <ArrowLeft size={18} />
            </a>
            <div>
              <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                Wall of Thanks
              </h1>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                Everyone who bought us a coffee
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              disabled={loading}
              className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)] cursor-pointer disabled:opacity-50"
              style={{ color: 'var(--text-secondary)' }}
              title="Refresh"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Total Donors', value: Object.keys(aggregated).length, icon: Heart, color: '#f06f6f' },
            { label: 'Donations', value: donations.length, icon: Coffee, color: 'var(--color-brand-purple)' },
            { label: 'Total Raised', value: `$${Math.round(totalUsd)}`, icon: Trophy, color: '#f0c46f' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-xl p-4 text-center"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
            >
              <Icon size={18} className="mx-auto mb-2" style={{ color }} />
              <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</div>
              <div className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Top Donors Leaderboard */}
          <div
            className="md:col-span-1 rounded-xl p-5 self-start"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={16} style={{ color: '#f0c46f' }} />
              <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                Top Supporters
              </h2>
            </div>

            {topDonors.length === 0 && !loading && (
              <p className="text-xs text-center py-4" style={{ color: 'var(--text-tertiary)' }}>
                No donations yet. Be the first!
              </p>
            )}

            <div className="space-y-2.5">
              {topDonors.map((donor, i) => (
                <div key={donor.name} className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                    style={{
                      background: i < 3 ? `${medalColors[i]}20` : 'var(--bg-tertiary)',
                      color: i < 3 ? medalColors[i] : 'var(--text-tertiary)',
                      border: i < 3 ? `1px solid ${medalColors[i]}40` : '1px solid var(--border-primary)',
                    }}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                      {donor.name}
                    </p>
                    <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                      {donor.count} donation{donor.count > 1 ? 's' : ''}
                    </p>
                  </div>
                  <span className="text-xs font-semibold shrink-0" style={{ color: 'var(--color-brand-green)' }}>
                    ~${Math.round(donor.totalUsd)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* All Donations */}
          <div className="md:col-span-2">
            <h2 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Heart size={16} style={{ color: '#f06f6f' }} />
              Recent Donations
            </h2>

            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-xs"
                style={{ background: 'rgba(240,111,111,0.1)', border: '1px solid rgba(240,111,111,0.2)', color: '#f06f6f' }}
              >
                {error}
                <button onClick={() => setError('')} className="ml-auto underline cursor-pointer">Dismiss</button>
              </div>
            )}

            {loading && donations.length === 0 && (
              <div className="flex justify-center py-12">
                <div className="w-6 h-6 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!loading && donations.length === 0 && (
              <div className="text-center py-12">
                <Coffee size={40} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  No donations yet. Be the first to buy us a coffee!
                </p>
                <a
                  href="/#donate"
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 btn-press"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-brand-blue), var(--color-brand-green))',
                    color: '#0a0b0f',
                  }}
                >
                  <Coffee size={14} />
                  Buy a coffee
                </a>
              </div>
            )}

            <div className="space-y-3">
              {donations.map((d) => (
                <div
                  key={d.id}
                  className="rounded-xl p-4"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {d.name}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className="px-2 py-0.5 rounded-full text-[11px] font-bold"
                        style={{
                          background: 'rgba(94,196,168,0.1)',
                          color: '#5ec4a8',
                          border: '1px solid rgba(94,196,168,0.2)',
                        }}
                      >
                        {formatAmount(d)}
                      </span>
                      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                        {new Date(d.created_at).toLocaleDateString('vi-VN', {
                          day: '2-digit', month: '2-digit', year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  {d.message && (
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      "{d.message}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
