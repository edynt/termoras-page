# Termoras Page - Codebase Scout Report

**Date:** March 14, 2026  
**Report Location:** `/plans/reports/scout-2026-03-14-*.md`  
**Status:** COMPLETE

## Quick Start

This document provides a comprehensive overview of the Termoras landing page codebase structure, with particular focus on the donation system implementation.

### View Reports

1. **Executive Summary** → `plans/reports/scout-2026-03-14-summary.txt`
   - High-level overview of tech stack, critical files, and key features
   - Best for: Quick understanding of the project

2. **Detailed Structure** → `plans/reports/scout-2026-03-14-codebase-structure.md`
   - In-depth analysis of each component, file, and system
   - Best for: Understanding implementation details

3. **File Manifest** → `plans/reports/scout-2026-03-14-file-manifest.md`
   - Quick reference of all relevant files and their purposes
   - Best for: Finding specific files quickly

## Project At a Glance

**Framework:** React 19 + TypeScript  
**Build Tool:** Vite 7.3  
**Styling:** Tailwind CSS 4.2 (zero-runtime)  
**Database:** Supabase  
**Routing:** Custom hash-based  

## Critical Files

### Donation System (3 Primary Files)
```
/src/components/donate-section.tsx    - Main donation UI on landing page
/src/pages/donors-public.tsx          - Public donors wall
/src/pages/donors-admin.tsx           - Admin donation management
```

### Database Layer
```
/src/lib/supabase.ts                  - All database operations
```

### Navigation & Layout
```
/src/components/navbar.tsx            - Header (includes donate nav link)
/src/App.tsx                          - Routing logic
```

### Styling & Theme
```
/src/index.css                        - Global styles + custom theme variables
/src/context/theme-context.tsx        - Light/dark theme provider
```

## Key Features

### 1. Donation Section (`donate-section.tsx`)
- Two payment methods: PayPal + Bank Transfer (VietQR)
- Preset amounts with custom input support
- QR code generation for bank transfers
- Tab switching between payment methods
- Environment variable driven (safe to disable)

### 2. Public Donors Wall (`donors-public.tsx`)
- "Wall of Thanks" display at `/#donors`
- Top 10 donors leaderboard with medal badges
- Recent donations with timestamps
- Statistics dashboard (total donors, raised amount)
- Aggregates and ranks donations by amount

### 3. Admin Donations (`donors-admin.tsx`)
- Protected with Supabase authentication
- Add donations via form (name, amount, currency, message)
- Delete donations with confirmation
- Refresh list manually
- Login/logout controls

### 4. Database Integration (`supabase.ts`)
- `fetchPublicDonations()` - Public READ
- `fetchDonations()` - Admin READ (auth required)
- `insertDonation(data)` - Admin WRITE (auth required)
- `deleteDonation(id)` - Admin DELETE (auth required)
- Full authentication helpers included

## Routes

Hash-based routing (no external router needed):

```
#                  → Landing page (default)
#features          → Jump to features section
#showcase          → Jump to showcase section
#tech              → Jump to tech stack section
#feedback          → Public feedback wall
#admin/feedback    → Admin feedback management
#donors            → Public donors wall ← NEW
#admin/donors      → Admin donation panel ← NEW
#download          → Jump to download section
```

## Environment Variables

Required for donations to work:

```env
# Supabase (required for all features)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# PayPal (optional, donation disabled if missing)
VITE_PAYPAL_ME_USERNAME=your_paypal_username

# VietQR Bank Transfer (optional, donation disabled if missing)
VITE_VIETQR_BANK_BIN=970422  # Your bank's BIN
VITE_VIETQR_ACCOUNT_NO=1234567890
VITE_VIETQR_ACCOUNT_NAME=Your Name
```

If `VITE_PAYPAL_ME_USERNAME` and both VietQR vars are missing, the donation section won't render.

## Styling System

### Colors (CSS Custom Properties)
- `--color-brand-blue: #6ba1f1`
- `--color-brand-green: #5ec4a8`
- `--color-brand-purple: #a78bfa`
- `--color-brand-red: #f06f6f`
- `--color-brand-yellow: #f0c46f`

### Light/Dark Theme
- Defined in `/src/index.css`
- Controlled by `/src/context/theme-context.tsx`
- Persisted to localStorage
- Respects system preference if set to "system"

### Tailwind CSS
- Zero-runtime via `@tailwindcss/vite`
- Custom theme tokens in `@theme` block
- Responsive breakpoints: `max-md:` for mobile

## Animations

### Scroll-Triggered
- `.fade-up` - Opacity + Y translation when scrolling into view
- `.stagger-1` through `.stagger-6` - Cascading animation delays

### Continuous
- `float` (20s) - Ambient orbs in background
- `shimmer` (3s) - Badge gradient animation
- `pulse-dot` (2s) - Indicator pulse effect
- `blink` (1s) - Cursor blinking effect

## Components Overview

### Landing Page Sections
- `navbar.tsx` - Sticky header with responsive nav
- `hero.tsx` - Hero section with download CTAs
- `features.tsx` - Feature showcase
- `showcase.tsx` - App preview mockup
- `tech-stack.tsx` - Technology stack display
- `donate-section.tsx` ⭐ - Donation UI
- `footer.tsx` - Footer
- `feedback-widget.tsx` - Feedback form

### Theme & Navigation
- `theme-toggle.tsx` - Light/dark switcher
- `theme-context.tsx` - Theme provider

### Hooks
- `use-scroll-animation.ts` - Scroll animation detection
- `use-latest-release.ts` - GitHub release fetching

## Database Schema

### Donations Table (Supabase)
```sql
CREATE TABLE donations (
  id UUID PRIMARY KEY,
  name VARCHAR,
  amount INTEGER,
  currency VARCHAR(3),  -- 'USD' or 'VND'
  message TEXT,
  created_at TIMESTAMP
);

-- RLS Policies:
-- SELECT: Public (anyone can view donations)
-- INSERT: Authenticated only
-- DELETE: Authenticated only
```

### Feedback Table (Similar structure)
```sql
CREATE TABLE feedback (
  id UUID PRIMARY KEY,
  name VARCHAR,
  rating INTEGER,
  message TEXT,
  status VARCHAR(20),  -- 'pending' or 'resolved'
  created_at TIMESTAMP
);
```

## Development Workflow

### Start Development
```bash
npm install      # Install dependencies
npm run dev      # Start dev server (localhost:5173)
```

### Build for Production
```bash
npm run build    # TypeScript + Vite build
npm run preview  # Preview the production build
```

### Code Quality
```bash
npm run lint     # ESLint checks
```

### Output
- Build output to `/dist` folder
- Single-page app (all routes via hash)
- Static files only (no backend needed)

## Key Decisions

1. **Hash-based Routing** - No external router library, simpler for SPA
2. **Supabase** - PostgreSQL with built-in RLS and auth
3. **Tailwind CSS 4.2** - Zero-runtime styling via Vite plugin
4. **Custom Theme System** - CSS variables + localStorage for flexibility
5. **Dual Payment Methods** - PayPal (international) + VietQR (Vietnam local)
6. **Two Donor Pages** - Public display + admin management

## Testing the Donation System

### Locally
1. Set up `.env` with Supabase and payment credentials
2. `npm run dev`
3. Navigate to `localhost:5173/#donate` to test payment buttons
4. Navigate to `localhost:5173/#admin/donors` to test admin panel

### Production
1. Build: `npm run build`
2. Deploy `/dist` folder to static hosting
3. Supabase handles backend (RLS policies configured)
4. Payment gateways (PayPal.me, VietQR) handle actual transactions

## Deployment Checklist

- [ ] Environment variables configured in host
- [ ] Supabase project created with `donations` table
- [ ] RLS policies enabled on `donations` table
- [ ] PayPal Me account set up (if using PayPal)
- [ ] Bank account registered with VietQR (if using bank transfer)
- [ ] Built with `npm run build`
- [ ] `/dist` folder deployed to static hosting
- [ ] Custom domain configured (optional)
- [ ] DNS records updated (optional)

## File Structure Reference

```
src/
├── App.tsx                    # Main app + routing
├── main.tsx                   # React entry point
├── index.css                  # Global styles
├── components/
│   ├── navbar.tsx
│   ├── donate-section.tsx     ⭐
│   ├── hero.tsx
│   ├── features.tsx
│   ├── showcase.tsx
│   ├── tech-stack.tsx
│   ├── download-cta.tsx
│   ├── footer.tsx
│   ├── feedback-widget.tsx
│   ├── theme-toggle.tsx
│   └── app-preview.tsx
├── pages/
│   ├── donors-public.tsx      ⭐
│   ├── donors-admin.tsx       ⭐
│   ├── feedback-public.tsx
│   └── feedback-admin.tsx
├── context/
│   └── theme-context.tsx
├── hooks/
│   ├── use-scroll-animation.ts
│   └── use-latest-release.ts
└── lib/
    └── supabase.ts            ⭐

Configuration/
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── package.json
└── .env.example
```

## Additional Resources

- React 19 Docs: https://react.dev
- Vite Guide: https://vite.dev
- Tailwind CSS: https://tailwindcss.com
- Supabase Docs: https://supabase.com/docs
- Lucide Icons: https://lucide.dev

## Notes

- Project is a **single-page app** (SPA) with hash-based routing
- No backend server needed (Supabase handles database)
- All styling uses Tailwind CSS 4.2 with zero runtime overhead
- Theme system uses CSS custom properties for flexibility
- Donation feature is **optional** (disabled if env vars not set)
- Payment handling delegated to PayPal and VietQR (no PCI compliance needed)

---

**Report Generated:** March 14, 2026  
**Project Status:** Clean, ready for development  
**Last Commit:** f77f443 (Revert preview update)

For detailed information, see the individual report files in `/plans/reports/`.
