export function Footer() {
  return (
    <footer
      className="py-8 text-center"
      style={{ borderTop: '1px solid var(--border-secondary)' }}
    >
      <div className="max-w-[1120px] mx-auto px-6">
        <p className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
          Termoras &copy; 2026. Built with Tauri + React + Rust.
        </p>
      </div>
    </footer>
  )
}
