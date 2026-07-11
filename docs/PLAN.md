# Café Fausse — Build Plan & Division of Labor

Ground truth: the SRS (`docs/…SRS.pdf`) and the project brief. This plan maps every requirement
to an owner and a build order so three people can work in parallel without colliding.

---

## Tech stack (locked by the SRS)
- **Frontend:** React + JSX via **Vite**, React Router for the 5 pages, CSS **Flexbox/Grid**, responsive.
- **Backend:** **Flask** REST API, `flask-cors`, `psycopg2`/SQLAlchemy.
- **DB:** **PostgreSQL** — `customers` + `reservations` tables.

## Architecture
```
React (Vite, :5173)  ──HTTP/JSON──▶  Flask API (:5000)  ──▶  PostgreSQL (cafe_fausse)
  pages + forms                       /api/reserve                 customers
                                      /api/newsletter              reservations
```

---

## Division of labor (3 people)

The cleanest split for this app is **Frontend UI / Backend+DB / Design-integration-QA**, with each
person owning a vertical slice they can demo. Everyone speaks in the recording, so each owns
something visible.

### Person A — Frontend pages & routing
- Vite + React Router skeleton, shared layout (`Navbar`, `Footer`).
- **Home** (FR-1–FR-4), **Menu** (FR-5), **About Us** (FR-10–FR-11).
- Menu/awards/reviews content as data files from the SRS (no hard-coding in JSX).

### Person B — Backend, database & the two forms' logic
- Flask app, PostgreSQL schema (FR-17), `.env` config.
- **Reservations API** (FR-6–FR-9, FR-18): validate slot → assign random table of 30 → confirm/error.
- **Newsletter API** (FR-15–FR-16): validate email → store.
- Seed/reset scripts so the DB effect is easy to show live in the demo.

### Person C — Interactive frontend + design system + QA
- **Reservations page** form + client validation, wired to Person B's API.
- **Gallery** (FR-12–FR-14) with lightbox; newsletter signup form component.
- Global CSS theme (fine-dining look), responsive pass, cross-browser + mobile-emulator QA (NFR-7/8).

> Interfaces to agree on **day one** so A/B/C don't block each other:
> - API request/response JSON shapes for `/api/reserve` and `/api/newsletter`.
> - The menu/awards/reviews data-file format.
> - CSS variable names / theme tokens.

---

## Requirements traceability (SRS → owner)

| Req | Description | Owner |
|-----|-------------|-------|
| FR-1–FR-4 | Home: name, contact, hours, nav, theme/images | A |
| FR-5 | Menu categorized w/ exact items & prices | A |
| FR-10–FR-11 | About Us: history, mission, bios | A |
| FR-6 | Reservation form fields | C |
| FR-7 | Validate time slot availability/validity | B (logic) + C (UI) |
| FR-8 | Assign random table of 30 | B |
| FR-9 | Success / full-slot error message | B + C |
| FR-12–FR-13 | Gallery images + lightbox | C |
| FR-14 | Awards & reviews | C (data from A) |
| FR-15–FR-16 | Newsletter form + store in DB | C (UI) + B (API) |
| FR-17 | PostgreSQL customers + reservations tables | B |
| FR-18 | Flask reservation logic | B |
| NFR-1–2 | Performance (<3s load, <2s form) | all |
| NFR-3–4 | Usability, brand-consistent design | C |
| NFR-5 | No double/over-booking | B |
| NFR-7–8 | Cross-browser + responsive | C |
| NFR-9 | Modular, documented code | all |

---

## Build order (suggested)
1. **Setup** — Node + PostgreSQL installed; Vite app + Flask app scaffolded; DB created. *(this session's follow-on)*
2. **Contracts** — freeze API JSON shapes + data-file formats.
3. **Parallel build** — A: static pages; B: DB + APIs; C: theme + reservation/gallery/newsletter.
4. **Integration** — wire forms to APIs; end-to-end reservation + newsletter working.
5. **Polish & QA** — responsive, cross-browser, lightbox, empty/error states.
6. **Demo prep** — script the 5–10 min recording; show DB rows appearing live (psql, **not** an admin page).

---

## Grading targets (score 5)
- ✅ All 5 pages in React/JSX
- ✅ Every SRS requirement implemented
- ✅ Excellent UI/UX, proper Flexbox/Grid
- ✅ Working forms
- ✅ Flask + PostgreSQL correctly integrated (reservations + newsletter)
- ✅ Demo shows the **live DB effect** of a reservation & signup + "sophisticated reservations logic"
- ✅ `ai-tooling.md` present

## Submission checklist
- [ ] Recorded demo (5–10 min): all pages + nav, newsletter signup, reservation flow, **DB rows shown live**, discussion of decisions.
- [ ] All 3 members on camera, each speaks, each shows government ID + states name.
- [ ] PDF containing **each member's** GitHub repo link.
- [ ] Each repo: full source, `README.md`, `ai-tooling.md`, `quantic-grader` added as collaborator.
- [ ] Signed final page of the **Group Project Agreement**.
- [ ] Optional `staging.md`.
- [ ] ONE member submits on behalf of the group.
