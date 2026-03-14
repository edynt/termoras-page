# Code Review: Preview Components

**Date:** 2026-03-14
**Files:** `preview-sidebar.tsx`, `preview-views.tsx`, `preview-git-view.tsx`
**Plan:** none (ad-hoc review)

---

## Scope
- Files reviewed: 3 components + `preview-constants.ts`
- Lines of code: ~430 (all files combined)
- Review focus: static mockup/preview components for landing page hero

## Overall Assessment

Code is clean, well-organized, and appropriate for its purpose (static mockup). No security issues found — all content is hardcoded JSX with no dynamic data, no `dangerouslySetInnerHTML`, no user input. No state management, no API calls. Constants are centralized in `preview-constants.ts`. The main concerns are accessibility (medium) and minor DRY/performance issues (low).

---

## Critical Issues

None.

---

## High Priority Findings

None.

---

## Medium Priority Improvements

### 1. Accessibility — Interactive buttons have no accessible labels
**File:** `preview-sidebar.tsx` (lines 89–148)

The `<button>` elements for Board, Changes, Terminal 1, Terminal 2 have visible text children, so they are fine. However the SVG icon-only elements used as interactive-looking controls (add-project SVG in header, settings SVG in footer, theme toggle divs) are `<div>` or bare `<svg>` — not focusable, no `aria-label`.

Since this is a **non-interactive static mockup** (no real click handlers on those elements), this is acceptable. But the two terminal sidebar buttons (`Terminal 1`, `Terminal 2`) both call `onViewChange('terminal')` — they're functionally identical. This is correct for a mockup but worth noting.

**Impact:** Low for a purely decorative mockup. Would matter if repurposed as real UI.

### 2. `key={i}` (array index as key) in `DIFF_LINES` map
**File:** `preview-git-view.tsx` (line 185)

```tsx
{DIFF_LINES.map((line, i) => (
  <div key={i} ...>
```

`DIFF_LINES` is a module-level constant — it never reorders or changes at runtime. Using index as key is harmless here, but is inconsistent with the rest of the codebase where `key={name}` (stable string) is used. Low risk, but could be flagged by lint rules.

**Fix:** Add a stable `id` field to each `DIFF_LINES` entry, or construct a key from `oldLn`/`newLn`/`type`.

---

## Low Priority Suggestions

### 3. Duplicated inline SVG paths — no DRY extraction
Several SVG icons are copy-pasted across files:
- The terminal `<polyline points="4 17 10 11 4 5">` icon appears in both `preview-sidebar.tsx` (line 21) and `preview-views.tsx` (line 22–23).
- The `+` (add) line icon appears in `preview-views.tsx` (line 42) and `preview-git-view.tsx` (line 90).
- The GitBranch SVG body appears in `preview-sidebar.tsx` (line 31) and `preview-git-view.tsx` (line 47–49).

`preview-sidebar.tsx` already defines a `TerminalIcon` component that could be exported and shared. Since these are separate files without a shared icon module, the duplication is minor but violates DRY. If the preview grows, extracting shared icons to a `preview-icons.tsx` would reduce maintenance cost.

### 4. Hardcoded rgba strings instead of constants
**Files:** `preview-views.tsx`, `preview-git-view.tsx`

Values like `'rgba(107,161,241,0.08)'`, `'rgba(240,111,111,0.15)'`, `'rgba(94,196,168,0.08)'` are not in `PREVIEW_COLORS`. They're derived from the accent colors but with alpha — easy to drift if accent colors change. Could add alpha variants to the constants file.

### 5. `select-none` on outer sidebar wrapper is redundant with `select-none` CSS
**File:** `preview-sidebar.tsx` (line 48)

Minor — `select-none` on the root wrapper already covers all children. No issue.

### 6. `animate-spin` on spinner inside `animate-pulse` badge
**File:** `preview-views.tsx` (line 206)

A spinning SVG nested inside a pulsing parent works fine visually but compounds GPU composite layers. Negligible for a landing page with a single mockup instance. Not worth fixing unless performance profiling shows a concern.

---

## Positive Observations

- `PREVIEW_COLORS` constant extraction is clean — all color changes go through one file.
- `PreviewView` type is well-defined and used consistently.
- Mockup data (`KANBAN_COLS`, `STAGED_FILES`, `DIFF_LINES`) is module-level constants — no unnecessary re-creation on render.
- No `dangerouslySetInnerHTML` anywhere — XSS risk is zero.
- SVG icons are inline (no external requests, no CORS surface).
- `select-none` on sidebar prevents accidental text selection in the hero animation — good UX detail.
- Responsive breakpoint (`max-md:w-[160px]`) is applied consistently.

---

## Recommended Actions

1. **(Medium)** Replace `key={i}` in `DIFF_LINES.map` with a stable key derived from line content or add an `id` field.
2. **(Low)** Extract shared SVG icons (TerminalIcon, GitBranchIcon) to a shared `preview-icons.tsx` to avoid duplication across the three files.
3. **(Low)** Add alpha-variant color tokens to `PREVIEW_COLORS` (e.g., `accentBlueSubtle`, `accentRedSubtle`) to replace scattered `rgba(...)` strings.

---

## Metrics

- Security issues: 0
- Critical/High issues: 0
- Medium issues: 1 (index key)
- Low issues: 3 (DRY, hardcoded alphas, redundant select-none)
- Accessibility: Acceptable for static decorative mockup; no real interactive affordances missing labels
- Test coverage: N/A (static render components)
