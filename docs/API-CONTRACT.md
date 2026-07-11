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
- 🟡 **Open — response shape / `success` boolean**: current backend responses use `{ message, ... }`
  on success and `{ error: "..." }` on failure — there is **no `success` boolean** yet. Rob and
  Claude are still discussing whether to add one; don't build front-end logic that depends on a
  `success` key until this is confirmed. Check back here before wiring `handleSubmit`.

## Conventions
- All requests and responses are **JSON**.
- Flask reads the body with `request.get_json()` and replies with `jsonify(...)`.
- Success responses include a human-readable **`message`**; error responses include an **`error`**
  string. (No `success` boolean yet — see Resolution above.)
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
- `timeSlot` — ISO string from the `datetime-local` picker (`YYYY-MM-DDTHH:mm`)
- `guests` — the back end parses to an int; must be 1–4 (a party over 4 needs more than one table,
  which isn't supported)
- `phone` — optional; may be an empty string

**Back-end logic (implemented):** validates the slot is a real bookable time, then atomically locks
a **random free table (1–30)** for that exact time slot (Postgres `SELECT ... FOR UPDATE SKIP
LOCKED`, so concurrent requests can't double-book) → inserts the customer and reservation → marks
the table's `availability` row reserved. Always inserts a new customer row (no dedup — matches
FR-18's "insert new customer records").

**Actual responses (as implemented):**

| Case | Status | Body |
|------|--------|------|
| Booked | `201` | `{ "message": "Reservation confirmed!", "reservationId": 32, "tableNumber": 14, "timeSlot": "2026-07-18T19:30:00" }` |
| Time slot full | `409` | `{ "error": "That time slot is fully booked. Please choose another time." }` |
| Not a real time slot | `400` | `{ "error": "Selected time slot is not a valid reservation time." }` |
| Missing/invalid input | `400` | `{ "error": "Time slot, guests, name, and email are required." }` (or a more specific message for bad email / guest count) |

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
only made a reservation before) → upgrades that record to subscribed. Otherwise inserts a new
customer row.

**Actual responses (as implemented):**

| Case | Status | Body |
|------|--------|------|
| Subscribed | `201` | `{ "message": "You're subscribed to the Café Fausse newsletter!" }` |
| Already subscribed | `409` | `{ "error": "You're already subscribed." }` |
| Invalid email | `400` | `{ "error": "Please provide a valid email address." }` |
| Missing name/email | `400` | `{ "error": "Name and email are required." }` |

---

## 3. Cross-cutting — agree on these
- **CORS:** back end enables `flask-cors` so the front end origin (`localhost:5173`) can call the
  API. Without it the browser blocks cross-origin requests. ✅ done.
- **Field names are fixed** exactly as written above (the front end sends these keys verbatim).
- **Error contract:** on failure the back end sends `{ "error": "..." }` — front end should read
  `err.response?.data?.error` (not `.message`). On success, read `.message`.
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

_Status: sections 1 and 2 reflect the actual, tested backend as of 2026-07-11 (Rob). Open items for
Chris: add a Name field to `NewsletterSignup.jsx`, then wire both forms to these endpoints. The
`success` boolean question (see Resolution) is still pending — check this doc before assuming it
exists._
