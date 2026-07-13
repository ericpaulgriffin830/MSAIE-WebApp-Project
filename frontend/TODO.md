# Frontend TODO (for Chris)

## Open — reservation time picker needs widening (2026-07-12)

Backend changed (agreed with Chris + Eric): reservations are no longer limited to fixed 5/7/9 PM
slots. The old `availability` grid is gone, replaced with overlap-based scheduling — see
`docs/API-CONTRACT.md` section 1 for full details. New rules for a valid `timeSlot`:

- [ ] **Any 15-minute mark** (`:00`, `:15`, `:30`, `:45`) is now a valid start time, not just
      5/7/9 PM.
- [ ] **Mon–Sat**: earliest start `5:00 PM`, latest start `9:00 PM` (last seating ends at close,
      11:00 PM).
- [ ] **Sunday**: earliest start `5:00 PM`, latest start `7:00 PM` (last seating ends at close,
      9:00 PM).
- [ ] `ReservationForm.jsx`'s `validTimesForDate()` currently only generates 3 options for
      weekdays / 2 for Sunday (`[17, 19, 21]` / `[17, 19]`) — needs to generate every 15-minute
      mark across the same window instead. The per-weekday branching logic can stay, just the
      list of hours needs to become a list of `HH:MM` values stepping by 15 minutes.
- [ ] Every reservation still books the table for a full 2 hours regardless of the 15-minute
      granularity — no front-end change needed for that part, the backend handles it.

---

## Previously closed out (2026-07-12)

**All items below were done and verified as of 2026-07-12.** Chris's
`chris/part-c-gallery-newsletter-api` branch (merged to `main`) addressed every item; Rob then ran
a live end-to-end test (real Flask backend + real Postgres DB, driven from the actual browser UI)
confirming both forms genuinely work, not just that the code looks right. Kept here as a record of
what was done rather than deleted. **Note:** the "constrained to valid slots" item below describing
the 5/7/9 PM dropdown is now superseded by the open item above.

- [x] **Unify the CSS theme across all pages.** Home, Menu, About Us, and Navigation converted
      from Eric's light theme to the shared dark fine-dining design tokens
      (`--color-bg`, `--color-accent`, etc.). Verified visually — the whole site is cohesive now.

- [x] **Move Gallery to its own page.** `/gallery` route + nav link added.
  - [x] Route + nav link added in `App.jsx` / `Navigation.jsx`.
  - [x] FR-14 content (Awards & Reviews) moved from About Us to the new Gallery page — not
        duplicated, confirmed removed from `AboutUs.jsx`/`.css`.

- [x] **Name field added to `NewsletterSignup.jsx`.** Sends `{ name, email }` matching the
      backend's `NOT NULL` requirement.

- [x] **Reservation time input constrained to valid slots.** Went further than a simple dropdown:
      a calendar date picker (tomorrow–30 days out) plus a Time dropdown computed per-weekday
      from the chosen date (Sun: 5/7 PM; else: 5/7/9 PM), matching the backend's seeded slots
      exactly. Verified live: picking a Sunday only showed 5/7 PM.

- [x] **Both forms wired to the backend and verified end-to-end.**
  - [x] `fetch` used (no `axios` needed); Vite dev proxy added (`vite.config.js`: `/api` →
        `http://localhost:5000`).
  - [x] Both forms correctly branch on `data.success` / `data.message` / `data.error` per the
        response shapes below.
  - [x] Live-tested by Rob with the real backend + Postgres running: reservation form → `201`,
        on-screen "Reservation confirmed! Your table is #24.", confirmed row written to
        `reservations`; newsletter form → `201`, confirmed row written to `customers` with
        `newsletter_signup = true`. Test data cleaned up afterward. Chris independently verified
        this on his end too (commit message: reservation booked table #18, subscriber written to
        DB).

---

## Exact API response shapes

Pulled directly from `backend/app/routes.py` on 2026-07-12 — this is what the backend actually
does today, not a proposal. If it ever looks out of date, that file is the source of truth.

### `POST /api/newsletter`

Request body: `{ name, email, phone? }` (`name` and `email` required, `phone` optional)

| Case | Status | Body |
|------|--------|------|
| Subscribed | `201` | `{ "success": true, "message": "You're subscribed to the Café Fausse newsletter!" }` |
| Missing name/email | `400` | `{ "success": false, "error": "Name and email are required." }` |
| Invalid email format | `400` | `{ "success": false, "error": "Please provide a valid email address." }` |
| Already subscribed | `409` | `{ "success": false, "error": "You're already subscribed." }` |

### `POST /api/reservations`

Request body: `{ timeSlot, guests, name, email, phone? }` (`timeSlot`/`guests`/`name`/`email`
required, `phone` optional; `guests` must be 1–4)

`timeSlot` must be on a 15-minute mark, in the future, and within operating hours leaving room for
a full 2-hour seating: Mon–Sat `17:00`–`21:00`, Sunday `17:00`–`19:00` (see the open item above).

| Case | Status | Body |
|------|--------|------|
| Booked | `201` | `{ "success": true, "message": "Reservation confirmed!", "reservationId": 32, "tableNumber": 14, "timeSlot": "2026-07-18T19:30:00" }` |
| Missing required fields | `400` | `{ "success": false, "error": "Time slot, guests, name, and email are required." }` |
| Invalid email format | `400` | `{ "success": false, "error": "Please provide a valid email address." }` |
| `guests` not a number | `400` | `{ "success": false, "error": "Number of guests must be a number." }` |
| `guests` outside 1–4 | `400` | `{ "success": false, "error": "Parties must be between 1 and 4 guests per table." }` |
| `timeSlot` not a parseable date/time | `400` | `{ "success": false, "error": "Time slot is not a valid date/time." }` |
| `timeSlot` doesn't match a real bookable slot | `400` | `{ "success": false, "error": "Selected time slot is not a valid reservation time." }` |
| Slot fully booked (all 30 tables taken) | `409` | `{ "success": false, "error": "That time slot is fully booked. Please choose another time." }` |
| Unexpected server/DB error | `500` | `{ "success": false, "error": "Something went wrong while booking. Please try again." }` |

**Front-end handling pattern for both endpoints:**
```js
fetch('/api/reservations', { method: 'POST', headers: {...}, body: JSON.stringify(form) })
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      setMessage(data.message) // e.g. "Reservation confirmed!" — data.tableNumber also available
    } else {
      setMessage(data.error)   // show the error string directly, it's already user-facing
    }
  })
```
Check `data.success`, not `res.ok`/status code, to decide which branch to take — every status above
still returns valid JSON with a `success` key, so this works the same way for every case in the
tables above.

---
_Compiled 2026-07-11 by Rob + Claude, after the Eric-frontend port. Closed out 2026-07-12 after
Chris's `chris/part-c-gallery-newsletter-api` branch + Rob's end-to-end verification. Reopened
2026-07-12 same day: backend moved to 15-minute-increment scheduling (agreed with Chris + Eric),
so the time-picker item needs another pass — see the top of this file._
