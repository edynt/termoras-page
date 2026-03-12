## Code Review Summary

### Scope
- Files reviewed: `app-preview.tsx`, `preview-sidebar.tsx`, `preview-views.tsx`, `showcase.tsx`, `features.tsx`, `navbar.tsx`, `footer.tsx`, `hero.tsx`
- Lines of code analyzed: ~640
- Review focus: All 8 components as requested

### Overall Assessment
Code is clean, well-structured, and readable. File sizes all comply with the 200-line limit. No runtime bugs found. A few medium/low issues worth fixing.

---

### Critical Issues
None.

---

### High Priority Findings

**1. `setTimeout` inside `setInterval` — no cleanup on unmount (`app-preview.tsx` L21-31)**

The inner `setTimeout` (220ms fade) is not captured and not cleared on unmount. If the component unmounts during that 220ms window, the `setActive`/`setFading` state updates fire on an unmounted component — a no-op in React 18/19 but still a stale closure antipattern.

```tsx
// Current
useEffect(() => {
  const id = setInterval(() => {
    setFading(true)
    setTimeout(() => {          // ← not cleared on cleanup
      setActive(...)
      setFading(false)
    }, 220)
  }, ROTATE_MS)
  return () => clearInterval(id)
}, [])

// Fix
useEffect(() => {
  let timeoutId: ReturnType<typeof setTimeout>
  const id = setInterval(() => {
    setFading(true)
    timeoutId = setTimeout(() => {
      setActive((cur) => {
        const idx = TABS.findIndex((t) => t.id === cur)
        return TABS[(idx + 1) % TABS.length].id
      })
      setFading(false)
    }, 220)
  }, ROTATE_MS)
  return () => { clearInterval(id); clearTimeout(timeoutId) }
}, [])
```

Same issue in `handleTab` — the `setTimeout` is also unguarded, but since `handleTab` is not called from an effect it is lower severity.

**2. `handleTab` in `app-preview.tsx` does not reset the auto-rotate timer (L34-41)**

When a user clicks a tab, the interval continues counting from wherever it was. The view can switch again almost immediately. Fix: clear and restart the interval on manual tab click (use `useRef` to hold the interval id, reset it in `handleTab`).

---

### Medium Priority Improvements

**3. Duplicate `type View` definition (`preview-sidebar.tsx` L13, `app-preview.tsx` L5)**

`type View = 'terminal' | 'kanban' | 'git'` is defined in both files. Extract to a shared `types.ts` or `preview-types.ts` and import from both.

**4. Duplicate color constant `C` (`preview-sidebar.tsx`, `preview-views.tsx`)**

Both files define identical-looking `C` objects with overlapping keys. Minor divergence risk if colors are updated. Consider a shared `preview-colors.ts` const.

**5. `stagger-` classes only defined up to `stagger-6` in `index.css` (L122-127)**

`features.tsx` L91 uses `stagger-${i + 1}` for `i` in `0..5`, producing `stagger-1` through `stagger-6`. That is fine today, but any future 7th feature card silently gets no stagger. Add a comment or assertion, or use `Math.min(i + 1, 6)` to clamp explicitly:
```tsx
className={`fade-up stagger-${Math.min(i + 1, 6)} ...`}
```

**6. `features.tsx` L100 — `absolute` positioned glow div inside a non-`relative` parent sibling**

The glow `div` at L100 has `absolute inset-0` but the nearest `relative` ancestor is the card's `fade-up stagger-N glow-card` wrapper at L91 — which does not declare `position: relative` via a Tailwind class. `glow-card` sets it via CSS (`position: relative`), so it works, but it is fragile: if `glow-card` class is removed or the CSS changes, the glow bleeds out. Add `relative` to the card's `className` for explicitness.

**7. `showcase.tsx` — no `import React` or `React.ReactNode` but uses JSX with `React.ReactNode` in prop type (L120)**

```tsx
function KanbanColumn({
  children,
}: {
  children: React.ReactNode   // ← React namespace used without import
```

With React 19 + automatic JSX transform this resolves fine, but `React.ReactNode` still requires `React` in scope (as a type). It will compile because TypeScript resolves it via the ambient JSX types, but it is cleaner to `import type { ReactNode } from 'react'` and use `ReactNode` directly (consistent with `features.tsx` L2 which already does this correctly).

**8. `app-preview.tsx` L101 — spacer `div` is semantically meaningless**

```tsx
<div className="w-12" />   // ← right-side spacer to visually center the title
```

This relies on knowing the left tab group is ~48px wide. Use `flex` with `flex-1` on both sides and `absolute` on the centered text, or use a grid layout. Current approach breaks if tab widths change.

---

### Low Priority Suggestions

**9. Hardcoded `DOWNLOAD_BASE` URL references wrong repo (`hero.tsx` L4)**

```tsx
const DOWNLOAD_BASE = 'https://github.com/edynt/termoras-page/releases/...'
```
The repo is `termoras-cli` (or `termoras`), not `termoras-page`. The footer links to `https://github.com/edynt/termoras`. Verify the download URL points to the correct releases repo.

**10. `preview-views.tsx` L196 — index used as React key**

```tsx
{DIFF_LINES.map((line, i) => (
  <div key={i} ...>
```
`DIFF_LINES` is a static constant so this is safe, but it is inconsistent with the rest of the codebase which uses meaningful keys. Use `key={line.text}` or `key={i}` with a comment.

**11. `navbar.tsx` — no mobile menu/hamburger**

Navigation items are hidden on mobile (`hidden md:flex`). Users on small screens can only access Download. If this is intentional for v0.1.0, add a `TODO` comment.

**12. `hero.tsx` — ambient orbs animate on every render path including reduced-motion**

The float animations do not check `prefers-reduced-motion`. Consider:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-float, .animate-float-delayed, .animate-float-slow { animation: none; }
}
```

**13. Footer: `<footer>` lacks `aria-label`**

Minor but adds landmark semantics for screen reader users.

---

### Positive Observations

- All files are well under 200 lines; clean single-responsibility split.
- `passive: true` on scroll listener in `navbar.tsx` — correct.
- `rel="noopener noreferrer"` on external links — correct.
- `useEffect` cleanup (`clearInterval`) in `app-preview.tsx` — mostly correct (see issue #1).
- CSS custom property usage is consistent across all components.
- `TABS` and `KANBAN_COLS` as module-level constants (not recreated on render) — correct.
- `ThemeToggle` correctly extracted and reused in both mobile/desktop nav slots.

---

### Recommended Actions
1. Fix `setTimeout` cleanup in `useEffect` (High, `app-preview.tsx`)
2. Reset auto-rotate interval on manual tab click (High, `app-preview.tsx`)
3. Extract shared `type View` and color constants to avoid duplication (Medium)
4. Fix `React.ReactNode` import in `showcase.tsx` (Medium)
5. Add `prefers-reduced-motion` CSS guard for float animations (Low)
6. Verify `DOWNLOAD_BASE` repo URL (Low, `hero.tsx`)
7. Add `aria-label` to `<footer>` (Low)

---

### Metrics
- File size compliance: All 8 files under 200 lines — PASS
- Critical issues: 0
- High: 2
- Medium: 6
- Low: 5

---

### Unresolved Questions
- Is the absence of a mobile hamburger menu intentional for v0.1.0?
- Should `termoras-page` in `DOWNLOAD_BASE` be `termoras` or `termoras-cli`?
