# Membership Platform Research: Competitor Analysis & MVP Architecture
Date: 2025-03-13

## Executive Summary
Vietnamese creator market lacks dedicated membership platform targeting local monetization patterns. Opportunity exists to build an alternative to Patreon/Ko-fi using SePay bank transfer infrastructure, addressing Vietnam's social commerce dominance and tax-efficient creator income.

---

## 1. Competitor Landscape

### Pricing Models (2025-2026)
| Platform | Core Fee | Takeaway |
|----------|----------|----------|
| **Buy Me a Coffee** | 5% + 2.9% + $0.30 | Cheapest, simple UX, no PayPal |
| **Ko-fi** | 5% or $12/mo (Gold=0%) | Most flexible, PayPal support |
| **Patreon** | 10% (new plans, 5-8% legacy) | Expensive, memberships focus |

### Key Features Across Platforms
- Tiered memberships (basic/premium/elite model typical)
- Content gating & supporter-only posts
- One-time tips + recurring subscriptions
- Community building (Discord roles, polls, goals)
- Product/service sales capability
- Minimal content moderation overhead

**Critical Gap**: None support bank transfer in Vietnam; all rely on Stripe/PayPal.

---

## 2. Technical Architecture

### Content Access Control Pattern
```
User Login → Supabase Session
  ↓
Check tier against content.requiredTier
  ↓
Enforce Row Level Security (RLS) on database
  ↓
Render/deny content based on subscription status
```

### Subscription Database Schema (Essential)
```
Users: id, tier_level, subscription_status, renewal_date
Tiers: id, name, price, features (JSON)
Subscriptions: user_id, tier_id, status, created_at, renewal_at
Content: id, creator_id, title, required_tier, published_at
```

### Payment Workflow with SePay
**Challenge**: SePay uses manual bank transfer + webhooks, no auto-recurring.

**Solution Pattern**:
1. Generate unique payment QR code per subscription renewal
2. Store expected_amount + renewal_date
3. Webhook receives transfer confirmation
4. Update subscription.renewal_at automatically
5. Pre-renewal reminders (7 days before) with payment link

**Renewal Strategies**:
- **QR Code Payment**: Show VietQR code on dashboard 7 days pre-renewal
- **Payment Link**: Email/SMS with pre-generated SePay link (webhook handles auto-update)
- **Monthly Reminder**: Automated message with transfer instruction + QR code
- **Grace Period**: 7-14 day access window while waiting for transfer confirmation

---

## 3. MVP Feature Priority (MoSCoW)

### MUST-HAVE (Week 1-4)
- User auth (email/password, optional social)
- Creator dashboard: subscriber count, revenue, tier breakdown
- Single membership tier (launch with one tier to simplify)
- Bank transfer QR code generator (SePay integration)
- Content gating (simple role-based access)
- Subscriber list for creator
- Basic webhook receiver for payment confirmation

### SHOULD-HAVE (Week 5-8)
- Three-tier membership option
- Email notifications for payment received/renewal needed
- Subscriber export (CSV for tax records)
- Payment history/invoice view
- Content preview pages (teaser content)
- Creator profile customization

### COULD-HAVE (Post-MVP)
- Discord/Telegram integration for member-only channels
- Video content support (Vimeo/YouTube embed gating)
- One-time tips/donations
- Product sales module
- Advanced analytics
- Referral program

### WON'T-HAVE (MVP)
- Auto-recurring billing (SePay limitation)
- Mobile app
- Community forums
- Live streaming
- Content CDN optimization

---

## 4. Vietnamese Creator Market Insights

### Current Monetization Reality
- **65% of e-commerce** is social commerce (Facebook, Zalo, TikTok)
- Creator income sources: Shopee affiliate, Facebook/YouTube ads, buy/sell groups, direct DM payment
- **Pain points**:
  - Tax complexity (creators underreporting income)
  - Payment fragmentation (multiple platforms)
  - Buyer trust issues on social platforms
  - No centralized subscriber management

### Competitive Advantage for SePay-based Platform
1. **Local Payment Native**: Vietnamese bank accounts already have VietQR capability
2. **Tax Clarity**: Clear records for creator compliance (competitive advantage vs. gray-market groups)
3. **Lower Friction**: No international payment processing
4. **Creator Experience**: Natural workflow (same payment method they use for personal transfers)

### Market Opportunity
- Target: 10K-100K micro-creators (50-1000 subscribers)
- Pain point: Managing scattered subscribers across Facebook/Zalo/Shopee
- Willingness to pay: 5-10% fee (vs. 20%+ YouTube partner revenue share)

---

## 5. SePay Integration Deep Dive

### What SePay Provides
- Webhook notifications on bank transfer receipt
- Virtual account (VA) creation per subscription
- QR code generation (VietQR standard)
- 30+ bank integration (automatic settlement)
- Sandbox environment: my.dev.sepay.vn

### Payment Confirmation Workflow
```
Creator sets up account → SePay VA linked
Subscriber gets unique QR code + bank details
Subscriber transfers amount (no app required)
Bank confirms → SePay webhook fires
Your system marks subscription.renewal_at = today + 30 days
```

### Critical Implementation Notes
- **Idempotency**: Check uniqueness of webhook id + referenceCode to prevent duplicate charges
- **Confirmation Delay**: Bank transfers take 1-5 minutes; plan 30-min grace period
- **Failed Transfers**: Manual follow-up needed (SePay limitation = feature not bug)
- **Account Reconciliation**: Daily webhook log review for fraud detection

---

## 6. MVP Recommendation: 3-Month Build

### Phase 1 (Weeks 1-4): Core MVP
- Supabase + Next.js setup with RLS
- Creator login + dashboard
- Single-tier membership
- SePay webhook receiver (hardcoded single account initially)
- Content gating (role-based access)
- QR code display on renewal reminder

**Outcome**: Test creator behavior, payment flow reliability

### Phase 2 (Weeks 5-8): MVP Polish
- Multi-tier support
- Email notifications (Resend/SendGrid)
- Subscriber export + analytics
- Payment history view
- Creator profile page

**Outcome**: Production-ready for 100-500 creators

### Phase 3 (Weeks 9-12): Scale Prep
- Per-creator virtual accounts (SePay API)
- Webhook reliability monitoring
- Fraud detection rules
- Creator onboarding flow
- Public profile SEO

**Outcome**: Ready for public launch

---

## 7. Unresolved Questions

1. **SePay Volume Limits**: What are rate limits on webhook creation/virtual accounts at scale?
2. **Multi-Creator Accounts**: Can SePay handle separate VA per creator, or shared account model?
3. **Refund Policy**: How to handle refund requests without direct SePay reversals?
4. **Dispute Resolution**: Process for fraudulent transfers or payment disputes?
5. **Tax Reporting**: Should platform auto-generate monthly tax summaries for creators?
6. **Regional Expansion**: Will SePay support non-Vietnamese creators receiving payments?

---

## Sources
- [Patreon vs Ko-fi vs Buy Me a Coffee Comparison](https://alitu.com/creator/content-creation/patreon-vs-ko-fi-vs-buy-me-a-coffee/)
- [Ko-fi vs Buy Me a Coffee 2026 Guide](https://talks.co/p/kofi-vs-buy-me-a-coffee/)
- [Building Membership Platforms with Modern Stack](https://ceaksan.com/en/astro-paddle-cloudflare-membership-platform/)
- [SePay Webhook Documentation](https://docs.sepay.vn/tich-hop-webhooks.html)
- [Vietnam Social Commerce Market 2025](https://mmaglobal.com/files/documents/the_state_of_social_commerce_and_live-streaming_in_vietnam.pdf)
- [Zalo's Growth in Vietnam Social Media](https://vietcetera.com/en/zalos-momentum-shakes-up-vietnams-social-media-landscape)
- [MVP Development Checklist 2025](https://www.codelevate.com/blog/how-to-build-an-mvp-in-2025-checklist/)
- [Stripe Subscription Webhooks](https://docs.stripe.com/billing/subscriptions/webhooks)
