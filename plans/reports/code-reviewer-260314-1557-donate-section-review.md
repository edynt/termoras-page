# Code Review Summary

## Scope
- Files reviewed: `src/components/donate-section.tsx`, `src/App.tsx`, `src/components/navbar.tsx`, `.env.example`
- Lines analyzed: ~220
- Review focus: New donate section feature

## Overall Assessment

Feature is functional, visually consistent with the existing codebase, and TypeScript compiles clean. One critical bug (React Rules of Hooks violation) must be fixed before shipping. One medium UX issue with the PayPal fallback link.

---

## Critical Issues

### 1. Rules of Hooks violation — hooks called after early return

**File:** `donate-section.tsx` lines 34–39

```tsx
if (!hasPaypal && !hasBank) return null   // ← early return at line 34

const defaultTab: Tab = hasPaypal ? 'paypal' : 'bank'
const [tab, setTab] = useState<Tab>(defaultTab)  // ← hooks AFTER return
const [paypalAmount, setPaypalAmount] = useState(10)
const [vndAmount, setVndAmount] = useState(100_000)
```

React's Rules of Hooks forbid calling hooks after a conditional return. In practice this is fine when env vars are static (never changes at runtime), but it violates the rules, will trigger ESLint `react-hooks/rules-of-hooks`, and could break in Strict Mode or future React releases.

**Fix — move hooks before the early return:**

```tsx
export function DonateSection() {
  const hasPaypal = !!import.meta.env.VITE_PAYPAL_ME_USERNAME
  const hasBank = !!import.meta.env.VITE_VIETQR_BANK_BIN && !!import.meta.env.VITE_VIETQR_ACCOUNT_NO

  const [tab, setTab] = useState<Tab>(hasPaypal ? 'paypal' : 'bank')
  const [paypalAmount, setPaypalAmount] = useState(10)
  const [vndAmount, setVndAmount] = useState(100_000)

  if (!hasPaypal && !hasBank) return null
  // ...rest unchanged
}
```

---

## High Priority Findings

None.

---

## Medium Priority Improvements

### 2. PayPal link falls back to `#` when username is missing

**File:** `donate-section.tsx` line 137

```tsx
href={paypalUrl || '#'}
```

`paypalUrl` is only `null` when `hasPaypal` is false — but `hasPaypal` is already checked at line 116 (`tab === 'paypal' && hasPaypal`). So the `|| '#'` branch is unreachable dead code. It can be simplified to:

```tsx
href={paypalUrl!}
```

Or just keep `paypalUrl || '#'` as a safe guard — it's harmless but slightly misleading.

### 3. `defaultTab` variable is dead after hook fix

Once hooks are moved above the early return, `defaultTab` can be inlined directly into `useState` (as shown in the fix above). The intermediate const adds no value.

---

## Low Priority Suggestions

### 4. Missing `loading="lazy"` on QR image

The QR `<img>` is deep in the page — lazy loading would be a small perf win, especially on slower connections.

```tsx
<img ... loading="lazy" />
```

### 5. Navbar "Donate" link visible even when section is hidden

`navbar.tsx` line 43 always renders the "Donate" nav link. If neither `VITE_PAYPAL_ME_USERNAME` nor `VITE_VIETQR_BANK_BIN`/`VITE_VIETQR_ACCOUNT_NO` are set, `DonateSection` returns `null` (no section rendered), but the nav link still appears and scrolls to nothing.

Since env vars are build-time constants in Vite, this can be fixed with the same guard:

```tsx
// navbar.tsx
const navItems = ['Features', 'Showcase', 'Tech', 'Feedback']
if (import.meta.env.VITE_PAYPAL_ME_USERNAME || import.meta.env.VITE_VIETQR_BANK_BIN) {
  navItems.push('Donate')
}
```

---

## Positive Observations

- Graceful degradation: section hides itself when no payment method is configured — good pattern.
- `rel="noopener noreferrer"` on external PayPal link — correct.
- `encodeURIComponent` used on all VietQR URL parameters — correct, prevents injection into the QR URL.
- Design tokens (`var(--bg-card)`, `var(--text-secondary)`, etc.) used consistently — matches existing components.
- `.env.example` comments clearly explain which vars are optional — good DX.
- TypeScript: `tsc -b --noEmit` passes with zero errors.

---

## Recommended Actions

1. **[Critical]** Fix Rules of Hooks — move all `useState` calls before the early `return null` (see fix above).
2. **[Low]** Add `loading="lazy"` to the QR `<img>`.
3. **[Low]** Guard "Donate" nav item in `navbar.tsx` behind the same env var check.
4. **[Cleanup]** Remove the now-unreachable `|| '#'` fallback or the dead `defaultTab` const after the hook fix.

---

## Metrics
- TypeScript errors: 0
- ESLint: not run (1 known rule violation — `react-hooks/rules-of-hooks`)
- Test coverage: N/A (no tests in scope)
