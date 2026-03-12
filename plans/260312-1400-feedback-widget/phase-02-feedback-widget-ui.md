# Phase 02 — Feedback Widget UI

**Status:** Pending | **Priority:** High

## Overview
Build floating feedback button + modal form matching existing design system.

## Implementation Steps
1. Create `src/components/feedback-widget.tsx` — floating button + modal
2. Star rating component (interactive, 1-5)
3. Form: name input, star rating, message textarea, submit button
4. States: idle, submitting, success, error
5. Add `<FeedbackWidget />` to `App.tsx`
6. Animations: fade-in modal, scale button on hover

## Design Tokens (from existing CSS)
- Glass card: `var(--bg-card)`, `var(--border-primary)`, `backdrop-filter: blur(12px)`
- Button gradient: `from-brand-blue to-brand-green`
- Text colors: `var(--text-primary)`, `var(--text-secondary)`
- Rounded: `rounded-2xl` for modal, `rounded-full` for button

## Related Files
- `src/components/feedback-widget.tsx` (new)
- `src/App.tsx` (modified)
