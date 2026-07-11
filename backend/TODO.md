# Backend TODO

- [X] Rob: Copy `backend/.env.example` to `backend/.env` and fill in the real `cafe_fausse` DB credentials (username/password) before running the Flask app locally.
- [X] Reservation endpoint renamed `/api/reserve` -> `/api/reservations` to match Chris's API contract proposal.
- [X] Newsletter dedup: repeat signups now return `409 "You're already subscribed."`.
- [X] Every response now includes a `success` boolean, matching Chris's original proposal.
- [ ] Chris: `NewsletterSignup.jsx` needs a Name field added (`customers.customer_name` is `NOT NULL`) before wiring it to `POST /api/newsletter`. See `docs/API-CONTRACT.md` for the exact request/response shape.
- [ ] Chris: wire `ReservationForm.jsx`'s `handleSubmit` (currently just `console.log`) to `POST /api/reservations` — see `docs/API-CONTRACT.md` for the actual response shape.
