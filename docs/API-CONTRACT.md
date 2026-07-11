# API Contract — Café Fausse (DRAFT / proposal)

> The agreed interface between the **React front end** (Chris, Part C) and the **Flask back end**
> (Rob, Part B). This is a proposal to align on — adjust together, then treat as the source of
> truth so both sides can build in parallel without breaking each other.

## Conventions
- All requests and responses are **JSON**.
- Flask reads the body with `request.get_json()` and replies with `jsonify(...)`.
- Every response includes a **`success`** boolean and a human-readable **`message`** the front
  end can display directly (success or error).
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
- `guests` — the back end parses to an int
- `phone` — optional; may be an empty string

**Back-end logic (Part B):** find-or-insert the customer → count existing reservations for that
`timeSlot` → if under 30, assign a **random free table (1–30)** and insert the reservation →
otherwise reject.

**Responses:**

| Case | Status | Body |
|------|--------|------|
| Booked | `201` | `{ "success": true, "tableNumber": 14, "message": "Table 14 booked for July 18, 7:30 PM." }` |
| Time slot full | `409` | `{ "success": false, "message": "That time slot is fully booked. Please choose another time." }` |
| Missing/invalid input | `400` | `{ "success": false, "message": "Missing required fields." }` |

---

## 2. Newsletter signup — `POST /api/newsletter`

Stores an email subscriber (SRS FR-15/16).

**Request body:**
```json
{ "email": "chris@example.com" }
```

**Responses:**

| Case | Status | Body |
|------|--------|------|
| Subscribed | `201` | `{ "success": true, "message": "Subscribed." }` |
| Already subscribed | `409` | `{ "success": false, "message": "You're already subscribed." }` |
| Invalid email | `400` | `{ "success": false, "message": "Please enter a valid email address." }` |

---

## 3. Cross-cutting — agree on these
- **CORS:** back end enables `flask-cors` so the front end origin (`localhost:5173`) can call the
  API. Without it the browser blocks cross-origin requests.
- **Field names are fixed** exactly as written above (the front end sends these keys verbatim).
- **Success contract:** front end shows `message` from the response; on `success: true` for a
  reservation it also shows `tableNumber`.
- **Base URL:** front end will call the API via a configurable base (Vite dev proxy or an
  `axios` baseURL) so it's one place to change for local vs. deployed.

---

## Front-end wiring (Part C, once endpoints exist)
The reservation form already holds the payload and has success/error display built in. Connecting
is a small change to `handleSubmit`:
```js
axios.post('/api/reservations', form)
  .then((res) => setMessage(res.data.message))   // e.g. "Table 14 booked..."
  .catch((err) => setMessage(err.response?.data?.message || 'Something went wrong.'))
```

_Status: proposed by Chris (Part C). Pending agreement with Rob (Part B) and Eric (Part A)._
