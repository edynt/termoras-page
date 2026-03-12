import { useState, useRef, useEffect } from 'react'
import { MessageSquarePlus, X, Send, Star, CheckCircle, AlertCircle } from 'lucide-react'
import { submitFeedback } from '../lib/supabase'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function FeedbackWidget() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [message, setMessage] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  function reset() {
    setName('')
    setRating(0)
    setMessage('')
    setStatus('idle')
    setErrorMsg('')
  }

  function handleClose() {
    setOpen(false)
    // Reset after animation
    setTimeout(reset, 200)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !rating || !message.trim()) return

    setStatus('submitting')
    setErrorMsg('')

    try {
      await submitFeedback({
        name: name.trim(),
        rating,
        message: message.trim(),
      })
      setStatus('success')
      setTimeout(() => {
        handleClose()
      }, 1500)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Failed to submit feedback')
    }
  }

  const isValid = name.trim() && rating > 0 && message.trim()

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => {
          if (!open) reset()
          setOpen(!open)
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-brand-blue to-brand-green text-[#0a0b0f] transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 btn-press cursor-pointer"
        style={{
          boxShadow: '0 4px 24px rgba(107,161,241,0.35), 0 2px 8px rgba(0,0,0,0.15)',
        }}
        aria-label={open ? 'Close feedback form' : 'Send feedback'}
      >
        {open ? <X size={22} /> : <MessageSquarePlus size={22} />}
      </button>

      {/* Modal */}
      <div
        className="fixed bottom-24 right-6 z-50 transition-all duration-200 origin-bottom-right"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(8px)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-title"
          className="w-[340px] max-w-[calc(100vw-48px)] rounded-2xl overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-primary)',
            backdropFilter: 'blur(20px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid var(--border-primary)' }}
          >
            <div>
              <h3 id="feedback-title" className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                Send Feedback
              </h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                Help us improve Termoras
              </p>
            </div>
            <button
              onClick={handleClose}
              aria-label="Close feedback form"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-[var(--bg-tertiary)] cursor-pointer"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-5">
            {status === 'success' ? (
              <div className="flex flex-col items-center py-6 gap-3">
                <CheckCircle size={40} className="text-brand-green" />
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Thank you!
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Your feedback has been submitted.
                </p>
              </div>
            ) : (
              <>
                {/* Name */}
                <div className="mb-4">
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    maxLength={100}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-[var(--text-muted)]"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-primary)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-glow)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px var(--glow-blue)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-primary)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Rating
                  </label>
                  <div className="flex gap-1" role="group" aria-label="Star rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`Rate ${star} out of 5 stars`}
                        aria-pressed={rating === star}
                        className="p-1 transition-transform duration-150 hover:scale-110 cursor-pointer"
                      >
                        <Star
                          size={22}
                          fill={star <= (hoverRating || rating) ? '#f0c46f' : 'transparent'}
                          stroke={star <= (hoverRating || rating) ? '#f0c46f' : 'var(--text-muted)'}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's on your mind?"
                    required
                    rows={3}
                    maxLength={1000}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 resize-none placeholder:text-[var(--text-muted)]"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-primary)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-glow)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px var(--glow-blue)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-primary)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4 text-xs"
                    style={{
                      background: 'rgba(240,111,111,0.1)',
                      border: '1px solid rgba(240,111,111,0.2)',
                      color: '#f06f6f',
                    }}
                  >
                    <AlertCircle size={14} />
                    {errorMsg}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isValid || status === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 btn-press cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background:
                      isValid && status !== 'submitting'
                        ? 'linear-gradient(to bottom right, var(--color-brand-blue), var(--color-brand-green))'
                        : 'var(--bg-tertiary)',
                    color: isValid && status !== 'submitting' ? '#0a0b0f' : 'var(--text-tertiary)',
                    boxShadow:
                      isValid && status !== 'submitting'
                        ? '0 2px 12px rgba(107,161,241,0.2)'
                        : 'none',
                  }}
                >
                  {status === 'submitting' ? (
                    <>
                      <span
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Feedback
                    </>
                  )}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
