import { useState } from 'react'
import { Coffee, CreditCard, QrCode } from 'lucide-react'
import { useLanguage } from '../context/language-context'

const PAYPAL_PRESETS = [5, 10, 25, 50]
const VND_PRESETS = [50_000, 100_000, 200_000, 500_000]

function formatVnd(amount: number) {
  return amount.toLocaleString('vi-VN') + 'đ'
}

function getPaypalUrl(amount: number) {
  const username = import.meta.env.VITE_PAYPAL_ME_USERNAME
  if (!username) return null
  return `https://paypal.me/${username}/${amount}USD`
}

function getVietQrUrl(amount: number) {
  const bankBin = import.meta.env.VITE_VIETQR_BANK_BIN
  const accountNo = import.meta.env.VITE_VIETQR_ACCOUNT_NO
  const accountName = import.meta.env.VITE_VIETQR_ACCOUNT_NAME || ''
  if (!bankBin || !accountNo) return null
  const info = encodeURIComponent('Buy Termoras a coffee')
  const name = encodeURIComponent(accountName)
  return `https://img.vietqr.io/image/${bankBin}-${accountNo}-compact2.png?amount=${amount}&addInfo=${info}&accountName=${name}`
}

type Tab = 'paypal' | 'bank'

export function DonateSection() {
  const { t } = useLanguage()
  const hasPaypal = !!import.meta.env.VITE_PAYPAL_ME_USERNAME
  const hasBank = !!import.meta.env.VITE_VIETQR_BANK_BIN && !!import.meta.env.VITE_VIETQR_ACCOUNT_NO

  const [tab, setTab] = useState<Tab>(hasPaypal ? 'paypal' : 'bank')
  const [paypalAmount, setPaypalAmount] = useState(10)
  const [customPaypal, setCustomPaypal] = useState('')
  const [vndAmount, setVndAmount] = useState(100_000)
  const [customVnd, setCustomVnd] = useState('')

  if (!hasPaypal && !hasBank) return null

  // Use custom amount if entered, otherwise use preset
  const effectivePaypal = customPaypal ? Number(customPaypal) : paypalAmount
  const effectiveVnd = customVnd ? Number(customVnd) : vndAmount
  const paypalUrl = getPaypalUrl(effectivePaypal)
  const qrUrl = getVietQrUrl(effectiveVnd)

  const selectPaypalPreset = (amt: number) => {
    setPaypalAmount(amt)
    setCustomPaypal('')
  }
  const selectVndPreset = (amt: number) => {
    setVndAmount(amt)
    setCustomVnd('')
  }

  return (
    <section className="py-24 text-center relative" id="donate">
      <div className="section-separator" />

      {/* Ambient glow */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--glow-purple) 0%, transparent 55%)' }}
      />

      <div className="max-w-[1120px] mx-auto px-6 pt-20 relative">
        <div className="fade-up mb-3">
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-medium"
            style={{
              background: 'linear-gradient(90deg, rgba(167,139,250,0.1), rgba(240,196,111,0.1))',
              border: '1px solid rgba(167,139,250,0.15)',
              color: 'var(--color-brand-purple)',
            }}
          >
            <Coffee size={13} />
            {t.donate.badge}
          </span>
        </div>

        <h2 className="fade-up text-[clamp(28px,4vw,40px)] font-extrabold tracking-tight mb-4">
          <span className="gradient-text font-extrabold">{t.donate.title}</span>
        </h2>
        <p className="fade-up text-base mb-10 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
          {t.donate.subtitle}
        </p>

        {/* Payment card */}
        <div
          className="fade-up glow-card max-w-lg mx-auto rounded-2xl overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-primary)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Tabs */}
          {hasPaypal && hasBank && (
            <div className="flex border-b" style={{ borderColor: 'var(--border-primary)' }}>
              <button
                onClick={() => setTab('paypal')}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors duration-200"
                style={{
                  color: tab === 'paypal' ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  background: tab === 'paypal' ? 'var(--bg-card-hover)' : 'transparent',
                  borderBottom: tab === 'paypal' ? '2px solid var(--color-brand-blue)' : '2px solid transparent',
                }}
              >
                <CreditCard size={15} />
                {t.donate.paypal}
              </button>
              <button
                onClick={() => setTab('bank')}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors duration-200"
                style={{
                  color: tab === 'bank' ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  background: tab === 'bank' ? 'var(--bg-card-hover)' : 'transparent',
                  borderBottom: tab === 'bank' ? '2px solid var(--color-brand-green)' : '2px solid transparent',
                }}
              >
                <QrCode size={15} />
                {t.donate.bankTransfer}
              </button>
            </div>
          )}

          {/* PayPal tab */}
          {tab === 'paypal' && hasPaypal && (
            <div className="p-8 max-md:p-6">
              <div className="flex gap-2 justify-center flex-wrap mb-4">
                {PAYPAL_PRESETS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => selectPaypalPreset(amt)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 btn-press"
                    style={{
                      background: !customPaypal && paypalAmount === amt
                        ? 'linear-gradient(135deg, var(--color-brand-blue), var(--color-brand-green))'
                        : 'var(--bg-tertiary)',
                      color: !customPaypal && paypalAmount === amt ? '#0a0b0f' : 'var(--text-secondary)',
                      border: !customPaypal && paypalAmount === amt ? 'none' : '1px solid var(--border-primary)',
                    }}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Custom amount input */}
              <div className="flex items-center gap-2 justify-center mb-6">
                <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{t.donate.or}</span>
                <div className="relative">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder={t.donate.custom}
                    value={customPaypal}
                    onChange={(e) => setCustomPaypal(e.target.value)}
                    className="w-28 pl-7 pr-3 py-2.5 rounded-xl text-sm font-medium text-center outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-blue/30"
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: customPaypal ? '1px solid var(--color-brand-blue)' : '1px solid var(--border-primary)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>

              <a
                href={paypalUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 hover:-translate-y-0.5 btn-press w-full justify-center"
                style={{
                  background: '#0070ba',
                  color: '#fff',
                  boxShadow: '0 4px 20px rgba(0,112,186,0.3)',
                }}
              >
                <Coffee size={17} />
                {t.donate.buyViaPaypal.replace('${amount}', String(effectivePaypal))}
              </a>
              <p className="mt-4 text-[12px]" style={{ color: 'var(--text-muted)' }}>
                {t.donate.paypalRedirect}
              </p>
            </div>
          )}

          {/* Bank Transfer tab */}
          {tab === 'bank' && hasBank && (
            <div className="p-8 max-md:p-6">
              <div className="flex gap-2 justify-center flex-wrap mb-4">
                {VND_PRESETS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => selectVndPreset(amt)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 btn-press"
                    style={{
                      background: !customVnd && vndAmount === amt
                        ? 'linear-gradient(135deg, var(--color-brand-green), var(--color-brand-blue))'
                        : 'var(--bg-tertiary)',
                      color: !customVnd && vndAmount === amt ? '#0a0b0f' : 'var(--text-secondary)',
                      border: !customVnd && vndAmount === amt ? 'none' : '1px solid var(--border-primary)',
                    }}
                  >
                    {formatVnd(amt)}
                  </button>
                ))}
              </div>

              {/* Custom amount input */}
              <div className="flex items-center gap-2 justify-center mb-5">
                <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{t.donate.or}</span>
                <div className="relative">
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    placeholder={`${t.donate.custom} (VND)`}
                    value={customVnd}
                    onChange={(e) => setCustomVnd(e.target.value)}
                    className="w-36 px-3 py-2.5 rounded-xl text-sm font-medium text-center outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-green/30"
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: customVnd ? '1px solid var(--color-brand-green)' : '1px solid var(--border-primary)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    đ
                  </span>
                </div>
              </div>

              {qrUrl && (
                <div
                  className="inline-block rounded-xl p-3 mb-4"
                  style={{ background: '#fff' }}
                >
                  <img
                    src={qrUrl}
                    alt={`QR chuyển khoản ${formatVnd(effectiveVnd)}`}
                    width={240}
                    height={300}
                    className="rounded-lg"
                    loading="lazy"
                    style={{ minHeight: 200 }}
                  />
                </div>
              )}
              <p className="text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                {t.donate.scanQr}
              </p>
              <p className="mt-1 text-[12px]" style={{ color: 'var(--text-muted)' }}>
                {t.donate.qrAutoFill}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
