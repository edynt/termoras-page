# Code Review Summary

## Scope
- Files reviewed: `src/components/feedback-widget.tsx`, `src/lib/supabase.ts`, `src/App.tsx`
- Review focus: Security, UX/accessibility, code quality
- Plan file: none
- Updated plans: none

## Overall Assessment
Code is clean and functional. TypeScript passes with zero errors. Three issues require attention: one critical (no server-side rate limiting / spam protection), one high (no input length caps enabling oversized payloads), one medium (accessibility gaps in the star-rating widget). No secrets are committed; `.env` is gitignored correctly.

---

## Critical Issues

### C1 — No rate limiting / spam protection on `submitFeedback`
**File:** `src/lib/supabase.ts` line 15
**Risk:** Anyone can script unlimited INSERT calls using the publicly visible `VITE_SUPABASE_ANON_KEY` (it is intentionally public in Vite, but that means it is readable in the browser bundle). Without Row Level Security (RLS) insert policies that throttle or a CAPTCHA, the `feedback` table can be flooded.

**Required actions (outside the frontend):**
1. Enable RLS on the `feedback` table in Supabase and add a policy that restricts INSERTs (at minimum, no authenticated role needed, but rate-limit via a Postgres function or use Supabase's built-in rate limiting).
2. Consider adding a lightweight CAPTCHA (hCaptcha/Turnstile) or a honeypot field before the form is publicly released.

**Note:** The anon key exposure itself is by design in Vite/Supabase. The *only* protection is RLS — if RLS is off, the table is wide open.

---

## High Priority Findings

### H1 — No input length validation
**File:** `src/components/feedback-widget.tsx` lines 159, 219; `src/lib/supabase.ts` line 15

`name` and `message` have no `maxLength` attribute and `submitFeedback` sends raw trimmed strings. A user can submit a multi-MB message body. The Supabase client will attempt to INSERT it; if the DB column lacks a length constraint this is both a storage risk and potential DoS via large payloads.

**Fix — add `maxLength` to both inputs and mirror constraints in the DB schema:**
```tsx
// name input
<input maxLength={100} ... />

// message textarea
<textarea maxLength={1000} ... />
```
Also add a CHECK constraint or column length in Supabase (`name varchar(100)`, `message text` with a trigger, or a DB-level policy).

---

## Medium Priority Improvements

### M1 — Star rating is inaccessible to keyboard / screen-reader users
**File:** `src/components/feedback-widget.tsx` lines 191-208

The star buttons have no `aria-label`, so a screen reader announces them as unlabeled buttons. Keyboard users get no visual focus indicator (only hover scale). The selected state is communicated only through fill color.

**Fix:**
```tsx
<button
  key={star}
  type="button"
  aria-label={`Rate ${star} out of 5 stars`}
  aria-pressed={rating === star}
  onClick={() => setRating(star)}
  onMouseEnter={() => setHoverRating(star)}
  onMouseLeave={() => setHoverRating(0)}
  className="p-1 transition-transform duration-150 hover:scale-110 focus-visible:ring-2 focus-visible:ring-brand-blue rounded cursor-pointer"
>
```
Also expose the current group selection with `role="group"` + `aria-label="Star rating"` on the wrapping `<div>`.

### M2 — Close button missing `aria-label`
**File:** `src/components/feedback-widget.tsx` line 128-134

The header `X` close button has no accessible label. Screen readers will say "button" with no context.

**Fix:**
```tsx
<button aria-label="Close feedback form" onClick={handleClose} ...>
```

### M3 — Modal is not a true dialog (no focus trap, no `role="dialog"`)
**File:** `src/components/feedback-widget.tsx` lines 96-113

The modal div lacks `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`. Focus is not trapped inside when the modal opens, so Tab can escape to background content. For a landing page widget this is a WCAG 2.1 AA violation.

Minimum fix:
```tsx
<div
  ref={modalRef}
  role="dialog"
  aria-modal="true"
  aria-labelledby="feedback-title"
  ...
>
  // give the h3 id="feedback-title"
```
Focus trap requires a small utility (e.g., `focus-trap-react`) or a manual `useEffect` that constrains Tab within `modalRef`.

---

## Low Priority Suggestions

### L1 — `supabase` client instantiated with unchecked env vars
**File:** `src/lib/supabase.ts` lines 3-4

`import.meta.env.VITE_SUPABASE_URL` can be `undefined` at build time (missing `.env`). The `as string` cast silences TypeScript but `createClient(undefined, undefined)` will throw a runtime error that surfaces as an unhandled exception with no user-facing message.

```ts
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}
```

### L2 — `handleClose` calls `reset` inside a raw `setTimeout`
**File:** `src/components/feedback-widget.tsx` lines 47-51

If the component unmounts before the 200 ms timer fires, calling `setState` on an unmounted component produces a React warning (and in strict mode, an error in future React versions). Use a `useEffect` cleanup ref or `useCallback` guard.

---

## Positive Observations
- `.gitignore` correctly excludes `.env` and `.env.local` — no secrets committed.
- TypeScript compiles clean (`tsc --noEmit` exits 0).
- Escape key and outside-click handlers are properly cleaned up in `useEffect` returns.
- `status === 'submitting'` disables the submit button, preventing double-submission.
- `trim()` on all string fields before insert is correct.
- The `VITE_` prefix on env vars correctly limits them to client-side exposure (no server secret leak).

---

## Recommended Actions (prioritized)
1. **[Critical]** Enable Supabase RLS on `feedback` table with an INSERT policy; add rate limiting or honeypot before public launch.
2. **[High]** Add `maxLength={100}` / `maxLength={1000}` to name/message inputs + matching DB constraints.
3. **[Medium]** Add `aria-label` to star buttons + close button; add `role="dialog"` / `aria-modal` / focus trap to modal.
4. **[Low]** Guard env var reads in `supabase.ts` with an explicit check instead of `as string` cast.
5. **[Low]** Guard `setTimeout(reset, 200)` against setState-on-unmount.
