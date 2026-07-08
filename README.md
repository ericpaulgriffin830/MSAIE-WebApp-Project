# Café Fausse — Web Application

A full-stack website for the fictional fine-dining restaurant **Café Fausse**, built for the
Quantic MSAIE *Web Application & Interface Design* project.

- **Frontend:** React (JSX) + Vite, styled with CSS Flexbox/Grid (responsive)
- **Backend:** Flask (Python) REST API
- **Database:** PostgreSQL

> Status: **Setup / scaffolding.** Application code is not yet implemented — see
> [`docs/PLAN.md`](docs/PLAN.md) for the build plan and requirements traceability.

---

## Requirements at a glance

Ground truth is the SRS: [`docs/MSEE_Web_Application_and_Interface_Design_Cafe_Fausse_SRS.pdf`](docs).
Five pages minimum, plus two backend-backed features.

| Page | Key requirements |
|------|------------------|
| **Home** | Name, contact info (1234 Culinary Ave, Suite 100, Washington DC 20002 · (202) 555-4567), hours (Mon–Sat 5–11PM, Sun 5–9PM), nav links, hero image (FR-1–FR-4) |
| **Menu** | Categorized menu — Starters, Mains, Desserts, Beverages — with exact items & prices (FR-5) |
| **Reservations** | Form: time slot, # guests, name, email, optional phone → backend assigns 1 of 30 tables, success/error message (FR-6–FR-9) |
| **About Us** | History, mission, founder bios (Chef Antonio Rossi & Maria Lopez, founded 2010) (FR-10–FR-11) |
| **Gallery** | High-res images + lightbox, awards, customer reviews (FR-12–FR-14) |
| **Newsletter signup** | Email form w/ validation, stored in DB (FR-15–FR-16) |

**Database (FR-17):**
- `customers` — id, name, email, phone, newsletter_signup
- `reservations` — id, customer_id, time_slot (date+time), table_number

**Reservation logic (FR-18):** insert customer → check availability for the time slot →
assign a random free table (of 30) → return confirmation, or error if the slot is full.

---

## Project structure

```
Group Project/
├── frontend/                 # React + Vite app
│   ├── public/
│   └── src/
│       ├── assets/           # provided Café Fausse .webp images (in place)
│       ├── components/       # shared UI (Navbar, Footer, Lightbox, forms…)
│       ├── pages/            # Home, Menu, Reservations, AboutUs, Gallery
│       ├── data/             # menu.js, awards/reviews data from SRS
│       └── styles/           # global CSS + theme
├── backend/                  # Flask API
│   └── app/                  # routes, models, db
├── docs/                     # SRS, plan, group agreement
├── ai-tooling.md             # required: AI tools used & how
└── README.md
```

---

## Local setup (fill in as we build)

### Prerequisites
- Node.js ≥ 20 and npm
- Python ≥ 3.11
- PostgreSQL ≥ 14

> On this Mac these are installed via Homebrew (Node 26, PostgreSQL 16.14). Start the DB
> service once with `brew services start postgresql@16` (or `pg_ctl` if you prefer no daemon).

### Frontend
```bash
cd frontend
npm install
npm run dev            # http://localhost:5173
```

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# configure .env from .env.example (DB URL, etc.)
flask run              # http://localhost:5000
```

### Database
```bash
brew services start postgresql@16   # start the server (once)
createdb cafe_fausse                # create the app database
# run schema / seed script (TBD)
```

---

## Team

| Member | GitHub repo | Focus |
|--------|-------------|-------|
| Chris McCoy | https://github.com/cmccoy2008/MSAIE-WebApp-Project | Part C — reservation/gallery/newsletter forms, CSS theme/design system, QA |
| Rob Ottogalli | https://github.com/Rob-Ottogalli/MSAIE-WebApp-Project | Part B — Flask backend, PostgreSQL, reservation + newsletter logic |
| Eric Griffin | _repo TBD_ (`ericpaulgriffin830`) | Part A — Home/Menu/About Us pages + routing |

> **Shared source of truth:** Rob's repo. Each member mirrors the final code to their own repo
> for grading, and each adds **`quantic-grader`** as a collaborator (Settings → Collaborators).
> See [`docs/GIT-WORKFLOW.md`](docs/GIT-WORKFLOW.md) for the exact one-time setup + daily commands.

Each member must add **`quantic-grader`** as a collaborator on their repo
(Settings → Collaborators → Add people) before submission.
