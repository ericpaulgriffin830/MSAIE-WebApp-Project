# API Contract — Café Fausse

> The agreed interface between the **React front end** (Chris, Part C) and the **Flask back end**
> (Rob, Part B). Reconciled against the actual backend implementation on 2026-07-11 — see
> **Resolution** below for what changed from the original proposal and what's still open.

## Resolution (2026-07-11, Rob)
Compared this proposal against the backend Rob had already built and tested. Agreed/changed:
- ✅ **Reservation endpoint renamed** `/api/reserve` → **`/api/reservations`**, matching this doc.
- ✅ **Newsletter dedup added**: a second signup with an already-subscribed email now returns
  `409 "You're already subscribed."`, matching this doc.
- 🟡 **Open — newsletter request body**: the backend requires `{ name, email }`, not just
  `{ email }` as originally proposed here, because `customers.customer_name` is `NOT NULL` in the
  DB schema. **`NewsletterSignup.jsx` needs a Name field added** before it's wired to the API —
  see the actual request shape in section 2 below.
- ✅ **`success` boolean added**: every response now includes `"success": true` or `"success": false`,
  alongside `message` (success) or `error` (failure). Matches this doc's original proposal.
- ✅ **Customer dedup by email added (2026-07-12)**: both endpoints now treat email as a stable
  customer identifier — a repeat customer's reservation or newsletter signup is attached to their
  existing `customers` row (name/phone refreshed) instead of inserting a duplicate.
- 🟡 **Open — reservation time slots now support 15-minute increments (2026-07-12)**: the fixed
  5/7/9 PM grid is gone. Any 15-minute mark within operating hours is now a valid `timeSlot` — see
  the new rules in section 1 below. **`ReservationForm.jsx`'s time dropdown still only offers the
  old 3 options per day and needs to be widened** to offer every 15-minute increment; see
  `frontend/TODO.md`.

## Conventions
- All requests and responses are **JSON**.
- Flask reads the body with `request.get_json()` and replies with `jsonify(...)`.
- Every response includes a **`success`** boolean. Success responses also include a human-readable
  **`message`**; error responses include an **`error`** string instead.
- Base URLs during local dev: front end `http://localhost:5173`, back end `http://localhost:5000`.

---

## 1. Reservation — `POST /api/reservations`

Creates a reservation (SRS FR-6 to FR-9, FR-18).

**Request body** (this is exactly the reservation form's state object):
```json
{
  "timeSlot": "2026-07-18T19:30",
  "guests": 4,
  "name": "Chris McCoy",
  "email": "chris@example.com",
  "phone": ""
}
```
- `timeSlot` — ISO string (`YYYY-MM-DDTHH:mm`). **Must be on a 15-minute mark** (`:00`, `:15`,
  `:30`, `:45`) and **leave room for a full 2-hour seating before closing**:
  - Mon–Sat: earliest start `17:00`, latest start `21:00` (last seating ends at 23:00)
  - Sunday: earliest start `17:00`, latest start `19:00` (last seating ends at 21:00)
  - Must be in the future.

  Every reservation occupies its table for exactly 2 hours from `timeSlot`, so e.g. a 17:15 booking
  blocks that table until 19:15 — a *different* customer can book the same table starting at 19:15
  or later (back-to-back is fine; anything earlier that overlaps is not).
- `guests` — the back end parses to an int; must be 1–4 (a party over 4 needs more than one table,
  which isn't supported)
- `phone` — optional; may be an empty string

**Back-end logic (implemented, rewritten 2026-07-12):** there's no more pre-seeded slot grid.
Validity of `timeSlot` is computed directly from the rules above (weekday + 15-minute alignment +
operating hours), not looked up in a table. Availability is computed by checking which of the 30
tables have **no existing reservation whose 2-hour window overlaps the requested one** — a random
table from that free set is picked and the reservation is inserted. A Postgres **GiST exclusion
constraint** on `reservations` (`table_number` + a generated `reservation_period` range column)
is the actual safety net that guarantees no two overlapping reservations for the same table can
ever be committed, even under concurrent requests — the app doesn't need manual row locking.
Email is treated as a stable customer identifier: if a customer with that email already exists,
the reservation is attached to that existing row (name refreshed, phone refreshed if provided)
instead of inserting a duplicate customer; otherwise a new customer row is inserted.

**Actual responses (as implemented):**

| Case | Status | Body |
|------|--------|------|
| Booked | `201` | `{ "success": true, "message": "Reservation confirmed!", "reservationId": 32, "tableNumber": 14, "timeSlot": "2026-07-18T19:30:00" }` |
| Time slot full | `409` | `{ "success": false, "error": "That time slot is fully booked. Please choose another time." }` |
| Not a real time slot | `400` | `{ "success": false, "error": "Selected time slot is not a valid reservation time." }` |
| Missing/invalid input | `400` | `{ "success": false, "error": "Time slot, guests, name, and email are required." }` (or a more specific message for bad email / guest count) |

---

## 2. Newsletter signup — `POST /api/newsletter`

Stores an email subscriber (SRS FR-15/16).

**Request body (as implemented — 🟡 differs from the original proposal, see Resolution above):**
```json
{ "name": "Chris McCoy", "email": "chris@example.com", "phone": "" }
```
- `name` — **required**. `customers.customer_name` is `NOT NULL`, so this can't be email-only.
  **`NewsletterSignup.jsx` needs a Name field added** to send this.
- `phone` — optional; may be omitted.

**Back-end logic (implemented):** looks up an existing customer by email. If found and already
`newsletter_signup = true` → reject as duplicate. If found but not yet subscribed (e.g. they'd
only made a reservation before) → upgrades that record to subscribed and refreshes its name.
Otherwise inserts a new customer row.

**Actual responses (as implemented):**

| Case | Status | Body |
|------|--------|------|
| Subscribed | `201` | `{ "success": true, "message": "You're subscribed to the Café Fausse newsletter!" }` |
| Already subscribed | `409` | `{ "success": false, "error": "You're already subscribed." }` |
| Invalid email | `400` | `{ "success": false, "error": "Please provide a valid email address." }` |
| Missing name/email | `400` | `{ "success": false, "error": "Name and email are required." }` |

---

## 3. Cross-cutting — agree on these
- **CORS:** back end enables `flask-cors` so the front end origin (`localhost:5173`) can call the
  API. Without it the browser blocks cross-origin requests. ✅ done.
- **Field names are fixed** exactly as written above (the front end sends these keys verbatim).
- **Success/error contract:** check `res.data.success` first. On `true`, read `.message` (and
  `.tableNumber`/`.reservationId` for a booking). On `false`, read `.error`.
- **Base URL:** front end will call the API via a configurable base (Vite dev proxy or an
  `axios` baseURL) so it's one place to change for local vs. deployed.

---

## Front-end wiring (Part C) — updated for the actual response shape
```js
axios.post('/api/reservations', form)
  .then((res) => setMessage(res.data.message))          // e.g. "Reservation confirmed!"
  .catch((err) => setMessage(err.response?.data?.error || 'Something went wrong.'))
```
For the newsletter form, add a **Name** field to the form state and payload (see section 2) before
wiring the `fetch`/`axios` call.

---

_Status: sections 1 and 2 reflect the actual, tested backend as of 2026-07-12 (Rob). Open item for
Chris: widen `ReservationForm.jsx`'s time dropdown to offer 15-minute increments across the full
window in section 1, not just the old 5/7/9 PM options — see `frontend/TODO.md`._
