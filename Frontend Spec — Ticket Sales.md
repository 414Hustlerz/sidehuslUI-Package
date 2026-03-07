# Frontend Spec — Ticket Sales & Payments

Companion to `Payment System Design.md`. This document covers every screen, component, and integration point across all three apps: **Customer App**, **Business App** (Organiser + Vendor), and **Admin Portal**.

---

## Table of Contents

1. [Customer App](#customer-app)
2. [Business App — Organiser](#business-app--organiser)
3. [Business App — Vendor](#business-app--vendor)
4. [Admin Portal](#admin-portal)
5. [Shared Components](#shared-components)
6. [Yoco Checkout WebView Integration](#yoco-checkout-webview-integration)
7. [Supabase Realtime Subscriptions](#supabase-realtime-subscriptions)
8. [Error Handling & Edge Cases](#error-handling--edge-cases)

---

## Customer App

### 1. Event Detail — Ticket Selection

**Where:** Event detail screen (existing), below event info.

**Trigger:** `GET /events/{event_id}/ticket-types` — called when event detail loads.

**Display:**

```
┌─────────────────────────────────────┐
│  Tickets                            │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ General Admission       R200  │  │
│  │ 342 / 500 remaining          │  │
│  │ [  -  ]   2   [  +  ]        │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ VIP                     R800  │  │
│  │ 12 / 50 remaining            │  │
│  │ [  -  ]   1   [  +  ]        │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ Early Bird              R150  │  │
│  │ SOLD OUT                      │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ Total: R1,200                 │  │
│  │                               │  │
│  │      [ Buy Tickets ]          │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Behaviour:**

- Each tier shows: name, description (if any), price (formatted as ZAR), remaining count (`quantity_total - quantity_sold`), quantity selector
- Quantity selector: min 0, max = `min(max_per_order, remaining)`
- Sold out tiers: greyed out, no selector, show "SOLD OUT"
- Tiers with `sale_starts_at` in the future: show "Sales open {date}" — no selector
- Tiers with `sale_ends_at` in the past: show "Sales ended" — no selector
- Inactive tiers (`is_active = false`): hidden
- Sort by `sort_order`
- "Buy Tickets" button disabled until at least 1 ticket selected
- Show total amount: sum of (unit_price * quantity) for each tier
- Price display: format cents as ZAR (e.g., 20000 → "R200.00", drop .00 if whole number)

**Free events:**

- If all ticket types have price = 0, button text changes to "RSVP"
- No price column shown
- Tapping "RSVP" calls `POST /events/{event_id}/rsvp` directly (no checkout flow)
- On success: navigate to event hub

**API call on "Buy Tickets":**

```
POST /events/{event_id}/purchase

Body:
{
  "ticket_type_id": "uuid",
  "quantity": 3
}

Response:
{
  "purchase_id": "uuid",
  "checkout_url": "https://...",
  "checkout_id": "abc123"
}
```

**Note:** One purchase = one ticket type. If the customer selected tickets from multiple tiers, the app creates separate purchases sequentially, or you batch them client-side and present one checkout. Recommended approach: **one purchase per tier**, process them one at a time. The customer completes each checkout individually. This keeps refunds clean (refund per tier, not partial across tiers).

**Alternative (better UX):** Sum all tiers into a single checkout amount, store multiple `ticket_type_id` + `quantity` pairs in a single purchase. Backend would need to accept an `items` array instead of a single `ticket_type_id`. Decide based on complexity tolerance.

---

### 2. Checkout Screen (Yoco WebView)

**Where:** Full-screen modal, presented after "Buy Tickets" tap.

**See:** [Yoco Checkout WebView Integration](#yoco-checkout-webview-integration) for implementation details.

**Flow:**

```
[Buy Tickets] → API creates purchase → receive checkout_url
  → Present WebView modal (full screen)
  → Customer sees Yoco payment form
  → Customer enters card / selects payment method
  → 3D Secure challenge if required
  → Payment completes

SDK events:
  onCompleted  → dismiss modal → navigate to confirmation screen
  onCancelled  → dismiss modal → show "Payment cancelled" toast
  onExpired    → dismiss modal → show "Session expired" toast → allow retry
  onError      → dismiss modal → show error message → allow retry
```

**Loading state:** Show a spinner overlay until the WebView content loads.

**Back/swipe handling:** Intercept hardware back / swipe-to-dismiss. Show confirmation dialog: "Cancel payment?" — Yes dismisses, No keeps WebView open.

---

### 3. Purchase Confirmation Screen

**Where:** Shown after `onCompleted` fires from the WebView. Also accessible from purchase history.

**Data source:** `GET /purchases/{purchase_id}`

```
┌─────────────────────────────────────┐
│            Payment Successful       │
│                                     │
│  AfroBeats Festival 2026            │
│  Mar 15 — Cape Town Stadium         │
│                                     │
│  3x General Admission               │
│  Total: R600.00                      │
│                                     │
│  Purchase #SH-20260307-A3F9K        │
│  Payment confirmed                   │
│                                     │
│       [ View My Tickets ]           │
│       [ Back to Event ]             │
└─────────────────────────────────────┘
```

**Edge case — webhook delay:** The Yoco checkout redirects to `successUrl` but the webhook may not have arrived yet. The purchase may still show `status: pending`. Handle this:

1. On `onCompleted`, poll `GET /purchases/{purchase_id}` every 2 seconds, up to 5 attempts
2. If status becomes `completed` → show confirmation
3. If still `pending` after 5 attempts → show "Payment received — your tickets are being processed. You'll get a notification shortly." Navigate to tickets screen.
4. When the webhook arrives, backend sends a notification. App shows the notification and tickets appear.

---

### 4. My Tickets Screen

**Where:** Tab bar item or accessible from profile/menu.

**Data source:** `GET /me/tickets`

**Display:**

```
┌─────────────────────────────────────┐
│  My Tickets                         │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ AfroBeats Festival 2026      │  │
│  │ Mar 15 · Cape Town Stadium   │  │
│  │                               │  │
│  │ 3 tickets · General Admission │  │
│  │ [ View Tickets ]             │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ Jazz in the Park             │  │
│  │ Apr 2 · Emmarentia Dam       │  │
│  │                               │  │
│  │ 1 ticket · VIP               │  │
│  │ [ View Tickets ]             │  │
│  └───────────────────────────────┘  │
│                                     │
│  Past Events                        │
│  ┌───────────────────────────────┐  │
│  │ Summer Fest 2025             │  │
│  │ Dec 14 · Completed           │  │
│  │ 2 tickets                    │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Grouping:** Group by event. Upcoming first (sorted by event date asc), then past events (sorted desc). Show event image as card background or thumbnail.

**Tapping "View Tickets":** Navigate to event tickets detail.

---

### 5. Event Tickets Detail

**Where:** Reached from My Tickets or from event hub.

**Data source:** `GET /me/events/{event_id}/tickets`

**Display — single ticket card:**

```
┌─────────────────────────────────────┐
│                                     │
│  AfroBeats Festival 2026            │
│  Mar 15, 2026 · 14:00               │
│  Cape Town Stadium                   │
│                                     │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │       ┌─────────────┐        │  │
│  │       │   QR CODE    │        │  │
│  │       │  (ticket_    │        │  │
│  │       │   code)      │        │  │
│  │       └─────────────┘        │  │
│  │                               │  │
│  │  Ticket: SH-A3F9-K7M2        │  │
│  │  Type: General Admission      │  │
│  │  Holder: Thabo Mokoena        │  │
│  │  Status: Active               │  │
│  │                               │  │
│  │  [ Transfer ]  [ Refund ]     │  │
│  └───────────────────────────────┘  │
│                                     │
│  Swipe for next ticket →            │
│  1 / 3                              │
│                                     │
└─────────────────────────────────────┘
```

**Behaviour:**

- Horizontal swipe / page view to browse multiple tickets
- QR code encodes the `ticket_code` (e.g., `SH-A3F9-K7M2`) — same format the organiser scans at entry
- Show check-in status: if `checked_in_at` is set, show "Checked in at {time}" badge and hide Transfer/Refund buttons
- Transferred tickets: show "Transferred to {name}" badge, greyed out
- Refunded tickets: show "Refunded" badge, greyed out

**Transfer button:** Opens transfer flow (see section 7).

**Refund button:** Opens refund flow (see section 6). Only visible if event's `refund_policy` is not `no_refunds` and cutoff hasn't passed.

---

### 6. Refund Flow

**Where:** Initiated from ticket detail (single ticket) or purchase detail (bulk).

#### Single Ticket Refund

**Trigger:** Tap "Refund" on a ticket card.

**Pre-check (client-side):**
- Event `refund_policy` is not `no_refunds`
- If `conditional`: current time is before `event.start_date - refund_cutoff_hours`
- Ticket status is `active` (not transferred, not checked in)

If pre-check fails, show explanation: "Refunds are not available for this event" or "The refund window has closed (cutoff was {date/time})".

**Confirmation dialog:**

```
┌─────────────────────────────────────┐
│  Refund Ticket                      │
│                                     │
│  SH-A3F9-K7M2                       │
│  General Admission · R200.00        │
│                                     │
│  The refund will be processed to    │
│  your original payment method.      │
│  This may take 5-10 business days.  │
│                                     │
│  [ Cancel ]    [ Confirm Refund ]   │
└─────────────────────────────────────┘
```

**API call:**

```
POST /tickets/{ticket_id}/refund

Response:
{
  "ticket": { ... status: "refunded" },
  "refund_amount": 20000,
  "message": "Refund of R200.00 has been processed"
}
```

**On success:** Show success toast, update ticket card to "Refunded" state, pop back to tickets list.

**On error:** Show error message (e.g., "Refund failed — please try again or contact support").

#### Bulk Refund (from Purchase Detail)

**Where:** Accessible from purchase history or a "Refund Purchase" option.

**Data source:** `GET /purchases/{purchase_id}` — shows all tickets in the purchase.

**Display:** Checkbox list of refundable tickets. Select which ones to refund.

**API call:**

```
POST /purchases/{purchase_id}/refund

Body:
{
  "ticket_ids": ["uuid-1", "uuid-2"]
}
```

---

### 7. Transfer Flow (Updated)

The existing transfer flow changes slightly. Instead of transferring "access", the user transfers a **specific ticket**.

**Where:** Initiated from ticket detail card.

**Display:**

```
┌─────────────────────────────────────┐
│  Transfer Ticket                    │
│                                     │
│  SH-A3F9-K7M2                       │
│  General Admission · AfroBeats 2026 │
│                                     │
│  Recipient email:                   │
│  ┌───────────────────────────────┐  │
│  │ thandi@example.com            │  │
│  └───────────────────────────────┘  │
│                                     │
│  The recipient will receive a       │
│  notification. If they don't accept │
│  within 24 hours, the transfer      │
│  expires and the ticket returns     │
│  to you.                            │
│                                     │
│  [ Cancel ]    [ Send Transfer ]    │
└─────────────────────────────────────┘
```

**API call:** `POST /events/{event_id}/transfers` — body includes `{ recipient_email, ticket_id }` (new field).

**After transfer initiated:**
- Ticket card shows "Transfer pending — awaiting {email}" badge
- Transfer/Refund buttons hidden
- If transfer expires or is declined, ticket returns to `active` state

**Receiving a transfer (recipient side):**
- Notification: "You've received a ticket transfer for {event_name}"
- Tap notification → transfer detail screen (already exists)
- Accept → ticket appears in recipient's My Tickets
- Decline → ticket returns to sender

---

### 8. Free Event RSVP

**Where:** Event detail screen — replaces ticket selection for free events.

When all ticket types have `price = 0`, the ticket section simplifies:

```
┌─────────────────────────────────────┐
│  Free Event                         │
│                                     │
│  General Admission                  │
│  142 / 200 spots remaining          │
│                                     │
│         [ RSVP ]                    │
└─────────────────────────────────────┘
```

If multiple free tiers exist (e.g., "General" and "VIP — Free for students"), show the tier selector as usual but with "RSVP" instead of prices.

**API call:** `POST /events/{event_id}/rsvp` — body: `{ ticket_type_id }`. No checkout needed.

**On success:** Navigate to event hub. Ticket appears in My Tickets.

**Cancel RSVP:** `DELETE /events/{event_id}/rsvp` — available from event hub or ticket detail. Frees up the capacity slot.

---

### 9. Event Hub Updates

The existing event hub (`GET /events/{event_id}/hub`) already shows event state, orders, and announcements. Add:

- **My ticket info:** Show ticket type, ticket code, check-in status at the top of the hub
- **"My Tickets" quick link:** Navigate to event tickets detail

If the user has multiple tickets for the same event (e.g., bought for friends), show a count: "You have 3 tickets for this event".

---

### 10. Event Detail Updates

The existing event detail screen (`GET /events/{event_id}/full`) needs:

- **Ticket availability section** (described in section 1 above)
- **"Already have a ticket"** state: if the user already has active tickets for this event, replace the purchase section with: "You have {n} ticket(s)" + link to view them
- **Event status badges:** "Sold Out" (all tiers at capacity), "Almost Sold Out" (any tier < 10% remaining), "Free" (all tiers at price 0)

---

## Business App — Organiser

### 1. Ticket Type Management

**Where:** Event management screen → new "Tickets" tab or section.

**Data source:** `GET /events/{event_id}/ticket-types`

**Display:**

```
┌─────────────────────────────────────┐
│  Ticket Types                       │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ General Admission       R200  │  │
│  │ 158 / 500 sold               │  │
│  │ Sales: Mar 1 – Mar 14        │  │
│  │ Max per order: 10            │  │
│  │ [ Edit ]  [ Deactivate ]     │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ VIP                     R800  │  │
│  │ 38 / 50 sold                 │  │
│  │ Sales: Mar 1 – Mar 10        │  │
│  │ Max per order: 4             │  │
│  │ [ Edit ]  [ Deactivate ]     │  │
│  └───────────────────────────────┘  │
│                                     │
│       [ + Add Ticket Type ]         │
└─────────────────────────────────────┘
```

**Progress bar:** Show a visual bar for sold/total capacity per tier.

#### Add/Edit Ticket Type

**Screen:** Form presented as modal or pushed screen.

```
┌─────────────────────────────────────┐
│  Add Ticket Type                    │
│                                     │
│  Name *                             │
│  ┌───────────────────────────────┐  │
│  │ General Admission             │  │
│  └───────────────────────────────┘  │
│                                     │
│  Description                        │
│  ┌───────────────────────────────┐  │
│  │ Standard entry to the event   │  │
│  └───────────────────────────────┘  │
│                                     │
│  Price (ZAR) *                      │
│  ┌───────────────────────────────┐  │
│  │ 200.00                        │  │
│  └───────────────────────────────┘  │
│  Set to 0 for free                  │
│                                     │
│  Total Quantity *                   │
│  ┌───────────────────────────────┐  │
│  │ 500                           │  │
│  └───────────────────────────────┘  │
│                                     │
│  Max Per Order *                    │
│  ┌───────────────────────────────┐  │
│  │ 10                            │  │
│  └───────────────────────────────┘  │
│                                     │
│  Sale Start                         │
│  ┌───────────────────────────────┐  │
│  │ Mar 1, 2026 · 09:00          │  │
│  └───────────────────────────────┘  │
│                                     │
│  Sale End                           │
│  ┌───────────────────────────────┐  │
│  │ Mar 14, 2026 · 23:59         │  │
│  └───────────────────────────────┘  │
│                                     │
│  [ Cancel ]     [ Save ]            │
└─────────────────────────────────────┘
```

**Validation:**
- Name: required, max 100 chars
- Price: required, >= 0, numeric, 2 decimal places — stored as cents by backend
- Quantity: required, >= 1
- Max per order: required, >= 1, <= quantity
- Sale start: optional — defaults to now
- Sale end: optional — defaults to event start_date

**API calls:**
- Create: `POST /events/{event_id}/ticket-types`
- Update: `PATCH /ticket-types/{id}`
- Delete: `DELETE /ticket-types/{id}` — only if `quantity_sold = 0`. Show confirmation: "Delete this ticket type? This cannot be undone." If tickets have been sold, show: "Cannot delete — {n} tickets have been sold. Deactivate instead."

**Deactivate:** `PATCH /ticket-types/{id}` with `{ is_active: false }`. Hides from customers but preserves data. Toggle back to reactivate.

---

### 2. Refund Policy Configuration

**Where:** Event creation/edit form — new section.

**Display:**

```
┌─────────────────────────────────────┐
│  Refund Policy                      │
│                                     │
│  ○ No refunds                       │
│  ○ Full refunds allowed             │
│  ● Conditional refunds              │
│                                     │
│  Cutoff before event start:         │
│  ┌───────────────────────────────┐  │
│  │ 48 hours                      │  │
│  └───────────────────────────────┘  │
│  Refunds not allowed within 48h     │
│  of event start.                    │
└─────────────────────────────────────┘
```

**Fields:**
- `refund_policy`: radio group — `no_refunds`, `full_refund`, `conditional`
- `refund_cutoff_hours`: number input, only shown when `conditional` selected — common presets: 24h, 48h, 72h, 7 days (168h)

**Sent with:** `POST /events` or `PATCH /events/{event_id}`

---

### 3. Ticket Sales Dashboard

**Where:** Event dashboard screen (existing `GET /events/{event_id}/dashboard`). Add a "Ticket Sales" section.

**Display:**

```
┌─────────────────────────────────────┐
│  Ticket Sales                       │
│                                     │
│  Total Revenue         R45,200.00   │
│  Platform Fee (10%)    -R4,520.00   │
│  Your Earnings         R40,680.00   │
│                                     │
│  Tickets Sold           226 / 550   │
│  ███████████████░░░░░░  41%         │
│                                     │
│  By Type:                           │
│  General    158/500   R31,600.00    │
│  VIP         38/50    R30,400.00    │
│                                     │
│  Recent Purchases:                  │
│  Thabo M.   3x General   R600.00   │
│  Naledi K.  1x VIP        R800.00  │
│  Sipho D.   2x General   R400.00   │
│                                     │
│  [ View All Transactions ]          │
└─────────────────────────────────────┘
```

**Data sources:**
- `GET /organiser/financials/summary` (already exists, will include ticket revenue)
- `GET /organiser/events/{event_id}/transactions?type=ticket_sale`
- Ticket type availability from `GET /events/{event_id}/ticket-types`

---

### 4. Check-In Scanner

**Where:** Event management → "Check In" action. Available when event status is `published` and event date is today or imminent.

**Display:**

```
┌─────────────────────────────────────┐
│  Check In — AfroBeats 2026          │
│                                     │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │       [ Camera View ]         │  │
│  │       (QR Scanner)            │  │
│  │                               │  │
│  └───────────────────────────────┘  │
│                                     │
│  Or enter code manually:           │
│  ┌───────────────────────────────┐  │
│  │ SH-____-____                  │  │
│  └───────────────────────────────┘  │
│                                     │
│  Checked in: 142 / 226 sold        │
│                                     │
│  Last scanned:                     │
│  ✓ SH-A3F9-K7M2 · Thabo M.        │
│  ✓ SH-B7C2-M4N8 · Naledi K.       │
│  ✗ SH-X1Y2-Z3W4 · Already used    │
└─────────────────────────────────────┘
```

**Flow:**
1. Scan QR code → extracts `ticket_code`
2. Call `POST /events/{event_id}/validate-entry` with the ticket code (existing endpoint, updated to work with new ticket codes)
3. Success: green flash + haptic, show holder name + ticket type
4. Already checked in: orange flash, show "Already checked in at {time}"
5. Invalid/refunded/transferred: red flash, show reason

**Manual entry:** Fallback for damaged QR codes. Same validation endpoint.

---

### 5. Attendee List Updates

The existing attendee list now shows richer data:

- Ticket type per attendee (General, VIP, etc.)
- Check-in status
- Access type: purchased, RSVP, transferred, granted
- Filter by ticket type, check-in status

---

## Business App — Vendor

No major changes for vendors in this phase. Vendors continue to manage stores, menus, and orders as before. The ticket/payment system is between customers and organisers.

**Minor update:** The vendor's event application flow remains unchanged — `event_fee` transactions continue to work as they do today.

---

## Admin Portal

### 1. Platform Settings

**Where:** New "Settings" section in admin navigation.

**Display:**

```
┌─────────────────────────────────────┐
│  Platform Settings                  │
│                                     │
│  Platform Fee                       │
│  ┌───────────────────────────────┐  │
│  │ 10 %                          │  │
│  └───────────────────────────────┘  │
│  Applied to all ticket sales and    │
│  vendor order revenue.              │
│                                     │
│  [ Save Changes ]                   │
└─────────────────────────────────────┘
```

**API calls:**
- `GET /admin/settings`
- `PATCH /admin/settings` with `{ platform_fee_percent: 10 }`

**Audit:** Changes should be logged in `admin_audit_log`.

---

### 2. Ticket Sales Overview

**Where:** Admin dashboard — new section or tab.

**Display:**

```
┌─────────────────────────────────────┐
│  Ticket Sales — Platform Wide       │
│                                     │
│  Total Revenue (All Time)           │
│  R1,245,600.00                      │
│                                     │
│  Platform Fees Earned               │
│  R124,560.00                        │
│                                     │
│  This Month:                        │
│  Revenue: R312,400.00               │
│  Tickets Sold: 1,847                │
│  Refunds Processed: 23 (R8,200.00) │
│                                     │
│  Top Events:                        │
│  1. AfroBeats 2026    R180,400.00   │
│  2. Jazz in the Park   R92,000.00  │
│  3. Summer Fest 2026   R40,000.00  │
│                                     │
│  [ View All Transactions ]          │
└─────────────────────────────────────┘
```

**Data source:** Extended `GET /admin/dashboard` response or a new `/admin/financials/summary` endpoint.

---

### 3. Payout Management

**Where:** Admin portal → Payouts section.

**Display:**

```
┌──────────────────────────────────────────────────────────┐
│  Payouts                                                 │
│                                                          │
│  Pending Payouts:                                        │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Organiser         Event              Amount        │  │
│  │ Pai Holdings      AfroBeats 2026     R40,680.00   │  │
│  │ Jozi Events       Jazz in Park       R18,400.00   │  │
│  │                                                    │  │
│  │ [ Process Payout ]                                │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  Payout History:                                         │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Date       Organiser       Amount     Status       │  │
│  │ Mar 5      Pai Holdings    R22,000    Processed   │  │
│  │ Feb 28     Jozi Events     R15,600    Processed   │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

**"Process Payout" flow:**
1. Admin taps "Process Payout" next to an organiser
2. Shows breakdown: gross revenue, platform fee, net amount, bank details (from `business_profiles`)
3. Admin confirms → creates a `payouts` record (status: `processed`)
4. Admin then manually sends payment via bank transfer
5. Mark payout as settled in the system

**Data sources:**
- `GET /admin/financials/pending-payouts` (new endpoint or extended from existing)
- Existing `payouts` table

---

## Shared Components

### 1. Price Formatter

Utility function used across all apps:

```
formatPrice(amountCents: number): string

Examples:
  formatPrice(20000) → "R200"
  formatPrice(20050) → "R200.50"
  formatPrice(0) → "Free"
```

### 2. Ticket Status Badge

Reusable badge component:

| Status | Colour | Label |
|--------|--------|-------|
| `active` | Green | "Active" |
| `transferred` | Blue | "Transferred" |
| `refunded` | Orange | "Refunded" |
| `cancelled` | Red | "Cancelled" |
| Checked in | Purple | "Checked In" |
| Transfer pending | Yellow | "Transfer Pending" |

### 3. Capacity Indicator

Used in ticket type cards and dashboard:

```
CapacityBar(sold: number, total: number)

- Green: < 50% sold
- Yellow: 50-90% sold
- Red: > 90% sold
- Grey + "SOLD OUT" text: 100% sold
```

### 4. QR Code Generator

Used on ticket detail cards:

```
TicketQR(ticketCode: string, size: number)

Encodes the ticket_code string (e.g., "SH-A3F9-K7M2") as a QR code.
Use a library like react-native-qrcode-svg.
```

### 5. QR Code Scanner

Used in organiser check-in screen:

```
TicketScanner(onScan: (code: string) => void)

Use react-native-camera or expo-barcode-scanner.
Decode QR → extract ticket_code string → pass to callback.
```

---

## Yoco Checkout WebView Integration

### Package

`react-native-webview` version 13.15+

### Component

```tsx
// components/YocoCheckout.tsx

interface YocoCheckoutProps {
  checkoutUrl: string;
  onCompleted: () => void;
  onCancelled: () => void;
  onFailed: () => void;
}
```

### WebView Configuration

```tsx
<WebView
  source={{ uri: checkoutUrl }}
  domStorageEnabled={true}
  javaScriptEnabled={true}
  onNavigationStateChange={handleNavigation}
/>
```

### Event Handling

Yoco redirects to `successUrl`, `cancelUrl`, or `failureUrl` after the customer completes (or abandons) payment. These are set by the backend as deep links (`sidehusl://payment-result?status=...`).

Intercept the redirect in `onNavigationStateChange`:

```tsx
const handleNavigation = (navState) => {
  if (navState.url.includes('payment-result')) {
    const url = new URL(navState.url);
    const status = url.searchParams.get('status');

    if (status === 'success') onCompleted();
    else if (status === 'cancelled') onCancelled();
    else if (status === 'failed') onFailed();
  }
};
```

### Important

- Always load the `checkoutUrl` (HTTPS) — never construct HTML locally.
- **Do not rely on the redirect for payment confirmation.** Always verify via webhook. The redirect tells the app to dismiss the WebView and start polling or wait for a push notification.
- The backend creates the checkout session and returns the `redirectUrl` — the mobile app just opens it.

---

## Supabase Realtime Subscriptions

### New Subscriptions

| Table | Channel | Who Subscribes | Use |
|-------|---------|----------------|-----|
| `tickets` | `tickets:holder_id=eq.{userId}` | Customer | Ticket status changes (transferred, refunded) |
| `ticket_purchases` | `ticket_purchases:user_id=eq.{userId}` | Customer | Purchase completion (webhook processed) |
| `ticket_types` | `ticket_types:event_id=eq.{eventId}` | Customer (on event detail) | Live availability updates (quantity_sold changes) |

### Why These Matter

- **`ticket_purchases`**: When the webhook fires after payment, the purchase status flips to `completed`. The app receives this in real-time and can update the UI without polling.
- **`tickets`**: If a ticket is refunded or transferred, the holder sees it immediately.
- **`ticket_types`**: On a popular event detail page, availability counts stay current as others purchase.

### Existing Subscriptions (Unchanged)

All existing realtime subscriptions (orders, stores, notifications, etc.) continue to work as before.

---

## Error Handling & Edge Cases

### Payment Failures

| Scenario | User Message | Action |
|----------|-------------|--------|
| Card declined | "Your card was declined. Please try a different card or contact your bank." | Stay on checkout, allow retry |
| 3D Secure failed | "Authentication failed. Please try again." | Dismiss WebView, allow retry |
| Network error during payment | "Connection lost during payment. Checking your payment status..." | Poll `GET /purchases/{id}` — may have succeeded |
| Checkout session expired (15 min) | "Your checkout session has expired. Please try again." | Dismiss WebView, create new purchase |
| Webhook delay (>30 seconds) | "Payment received — tickets are being processed. You'll get a notification." | Show pending state, rely on realtime subscription |

### Ticket Edge Cases

| Scenario | Handling |
|----------|----------|
| User buys tickets, then event is cancelled | Organiser cancels event → backend auto-refunds all tickets → customer gets notification + refund |
| User tries to buy sold-out tier | Backend returns 409 Conflict. Show "This ticket type just sold out. Please choose another." |
| Race condition: two users buy last ticket | Backend enforces `quantity_sold < quantity_total` atomically. Loser gets 409. |
| User tries to transfer checked-in ticket | Backend rejects. Show "Checked-in tickets cannot be transferred." |
| User tries to refund transferred ticket | Backend rejects. Show "This ticket has been transferred and cannot be refunded." |
| User buys then immediately requests refund | Allowed if within refund policy. No minimum hold period for MVP. |
| Purchase stuck in "pending" | If still pending after 1 hour (no webhook received), backend scheduler marks as `expired`. Customer can retry. |
| Free event at capacity | `POST /events/{event_id}/rsvp` returns 409. Show "This event is at capacity." |

### Offline Handling

- **Ticket viewing:** Cache ticket data locally. QR codes should be viewable offline (generated client-side from `ticket_code`).
- **Check-in scanning:** Requires network (must validate against backend). Show "No internet connection — scanning requires an active connection."
- **Purchasing:** Requires network. Show "No internet connection" if offline.

---

## Navigation Map

### Customer App

```
Home
├── Event Detail
│   ├── Ticket Selection
│   │   └── Yoco Checkout (WebView modal)
│   │       └── Purchase Confirmation
│   ├── RSVP (free events)
│   └── Already Have Tickets → Event Tickets Detail
│
├── My Tickets (tab)
│   └── Event Tickets Detail
│       ├── Transfer → Transfer Flow
│       └── Refund → Refund Confirmation
│
└── Notifications
    ├── "Tickets confirmed" → Event Tickets Detail
    ├── "Transfer received" → Transfer Accept/Decline
    └── "Refund processed" → Purchase Detail
```

### Business App — Organiser

```
My Events
└── Event Management
    ├── Tickets (new tab)
    │   ├── Ticket Type List
    │   │   ├── Add Ticket Type (modal)
    │   │   └── Edit Ticket Type (modal)
    │   └── Sales Dashboard
    │       └── Transaction List
    │
    ├── Refund Policy (in event edit)
    │
    └── Check In (event day)
        └── QR Scanner
```

### Admin Portal

```
Dashboard
├── Ticket Sales Overview (new section)
├── Settings
│   └── Platform Fee Configuration
└── Payouts
    ├── Pending Payouts
    └── Payout History
```

---

## API Quick Reference (Frontend Perspective)

### Customer Endpoints

| Action | Method | Endpoint | Request Body | Key Response Fields |
|--------|--------|----------|-------------|---------------------|
| List ticket types | GET | `/events/{id}/ticket-types` | — | `ticket_types[]`: name, price, quantity_total, quantity_sold, max_per_order, sale_starts_at, sale_ends_at |
| Purchase tickets | POST | `/events/{id}/purchase` | `{ ticket_type_id, quantity }` | `purchase_id`, `checkout_url`, `checkout_id` |
| Get purchase | GET | `/purchases/{id}` | — | `purchase`, `tickets[]` |
| My tickets (all) | GET | `/me/tickets` | — | `tickets[]` grouped by event |
| My tickets (event) | GET | `/me/events/{id}/tickets` | — | `tickets[]` |
| Refund ticket | POST | `/tickets/{id}/refund` | — | `ticket`, `refund_amount` |
| Bulk refund | POST | `/purchases/{id}/refund` | `{ ticket_ids: [] }` | `tickets[]`, `total_refund_amount` |
| RSVP (free) | POST | `/events/{id}/rsvp` | `{ ticket_type_id }` | `ticket`, `event_access` |
| Cancel RSVP | DELETE | `/events/{id}/rsvp` | — | — |
| Transfer ticket | POST | `/events/{id}/transfers` | `{ recipient_email, ticket_id }` | `transfer` |

### Organiser Endpoints

| Action | Method | Endpoint | Request Body | Key Response Fields |
|--------|--------|----------|-------------|---------------------|
| Create ticket type | POST | `/events/{id}/ticket-types` | `{ name, price, quantity_total, max_per_order, ... }` | `ticket_type` |
| Update ticket type | PATCH | `/ticket-types/{id}` | Partial update | `ticket_type` |
| Delete ticket type | DELETE | `/ticket-types/{id}` | — | — |
| Check in | POST | `/events/{id}/validate-entry` | `{ ticket_code }` | `ticket`, `holder`, validation result |
| Event transactions | GET | `/organiser/events/{id}/transactions?type=ticket_sale` | — | `transactions[]`, pagination |

### Admin Endpoints

| Action | Method | Endpoint | Request Body | Key Response Fields |
|--------|--------|----------|-------------|---------------------|
| Get settings | GET | `/admin/settings` | — | `platform_fee_percent` |
| Update settings | PATCH | `/admin/settings` | `{ platform_fee_percent }` | `settings` |
