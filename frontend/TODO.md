# Frontend TODO (for Chris)

Inventory taken after merging `main` (Chris + Rob's backend) with the `integrate-eric-frontend`
port (Home/Menu/About pages + routing). Everything below is outstanding — nothing here is done yet
unless marked otherwise.

- [ ] **Unify the CSS theme across all pages.** Eric's `Home.jsx`/`Menu.jsx`/`AboutUs.jsx` use a
      plain light theme (hardcoded `#333`/`#f5f5f5` colors); Rob's `Reservations` page uses your
      dark fine-dining theme (`index.css` design tokens: `--color-bg`, `--color-accent`, etc.).
      Rob did a **minimal contrast fix** so nothing is unreadable (Home's contact/hours text,
      the Menu/About page titles) — but the pages still look like two different sites. This needs
      your full theme pass.

- [ ] **Move Gallery to its own page**, per your plan from our merge meeting. It currently lives
      at the bottom of `/reservations` (`frontend/src/pages/Reservations.jsx`). While you're
      touching this:
  - [ ] Add a `/gallery` route in `frontend/src/App.jsx` and a nav link in
        `frontend/src/components/Navigation.jsx`.
  - [ ] **Add FR-14 content, which doesn't exist anywhere yet**: Awards (Culinary Excellence
        Award – 2022, Restaurant of the Year – 2023, Best Fine Dining Experience – Foodie
        Magazine 2023) and Customer Reviews (2 quotes — see SRS section 3.1.5). Only the 4 images
        + lightbox exist today in `frontend/src/components/Gallery.jsx`.

- [ ] **Add a Name field to `NewsletterSignup.jsx`.** The backend requires `{ name, email }`, not
      email-only — `customers.customer_name` is `NOT NULL` in the DB. See
      `docs/API-CONTRACT.md` section 2 for the exact shape.

- [ ] **Change the reservation time input from free-form to a constrained picker.**
      `ReservationForm.jsx` currently uses `<input type="datetime-local">`, which lets someone
      pick any time (e.g. 6:15 PM). The backend only accepts the exact pre-seeded 2-hour slots
      (5/7/9 PM Mon–Sat, 5/7 PM Sun) and rejects anything else as invalid. SRS FR-6 anticipates
      this ("dropdown **or** time picker") — needs to become a dropdown of valid slots so users
      don't hit a wall of "invalid time slot" errors.

- [ ] **Wire both forms to the backend** (`ReservationForm.jsx` → `POST /api/reservations`,
      `NewsletterSignup.jsx` → `POST /api/newsletter`). This needs some setup first, not just the
      `fetch`/`axios` calls:
  - [ ] Decide `fetch` vs. `axios` — `axios` isn't installed yet (`frontend/package.json` only has
        `react`, `react-dom`, `react-router-dom`), even though the old API contract doc's example
        used it.
      - [ ] Set up how `localhost:5173` reaches `localhost:5000` — no Vite dev proxy is configured
        for `/api/*` yet (`frontend/vite.config.js`), and no base URL is set anywhere.
  - [ ] Read the exact response shapes below — every response has a `success` boolean, `message`
        on success, `error` on failure.
  - [ ] To test end-to-end locally, you'll need your own `backend/.env` pointed at a Postgres DB
        with the schema + seed data (see `backend/TODO.md` / `README.md` for setup) — or coordinate
        with Rob to test against his running backend.

---

## Exact API response shapes

Pulled directly from `backend/app/routes.py` on 2026-07-11 — this is what the backend actually
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
_Compiled 2026-07-11 by Rob + Claude, after the Eric-frontend port. Flagged in group chat — expect
some back-and-forth on scope/ownership before starting._
