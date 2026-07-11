# AI Tooling Summary

> **Required deliverable.** Quantic asks for a summary of any AI code-generation tooling used
> and how — what worked well, what didn't. Keep this updated as you build; the grader reads it.

## Tools used

The **User** column attributes each tool's use to a team member so graders can see who did what.

| Tool | User | Where used | Notes |
|------|------|------------|-------|
| Claude Code (Opus) | Chris (C) | (1) Studying the underlying concepts before building; (2) project setup, scaffolding, requirements traceability from the SRS, git/repo wiring | Used as a Socratic/Feynman study tutor across all four course modules, then to generate the repo structure, PLAN.md, README, merged .gitignore |
| _e.g. Cursor_ | _Rob (B)_ | | |
| _e.g. ChatGPT / Codex_ | _Eric (A)_ | | |

## How we used AI (broad terms)

### Phase 1 — Studying the concepts *before* building (Chris)

Before writing any application code, Chris used Claude Code as an active-recall study tutor to
make sure he actually understood the material — not to have it hand back answers. The workflow:
upload his own notes plus the official Quantic module summaries, then get quizzed one question at
a time (Feynman technique), with the tutor pressing on vague answers, correcting misconceptions,
and tying each concept back to this project. This covered all four course modules:

- **2-1 Web Application Foundations** — client/server, front/back end, HTTP, databases, security
- **2-2 Interactive Web Pages** — JavaScript, the DOM, events & forms, React vs jQuery
- **2-3 Relational Databases** — schema design, keys, normalization, constraints, joins, CTEs
- **2-4 Back Ends** — Flask, MVC, WTForms/CSRF, ORM, REST, JSON, and the React integration

Evidence of this self-study is committed alongside this file in
[`docs/course-notes/`](docs/course-notes/): Chris's own notes for each module
(`chris-notes-2-*.md`), the official Quantic summaries (`2-*-Summary.pdf`), and the
[`study-log.md`](docs/course-notes/study-log.md) recording what was quizzed, what was solid, and
what needed rework. The point: the AI-assisted code below is built on Chris's own understanding,
so he can explain every implementation decision on camera.

### Phase 2 — Building the application (in progress)

- **Requirements analysis:** loaded the SRS PDF into the AI tool and had it extract the exact
  functional requirements (FR-1…FR-18), menu items/prices, and DB schema so nothing was missed.
- **Scaffolding:** used Claude Code to lay out the repo structure, the build plan
  ([`docs/PLAN.md`](docs/PLAN.md)), README, and the git/remote workflow.
- **Frontend components / styling (Chris, Part C):** _built one piece at a time — with the AI
  explaining each step so the code is understood, not just generated. TBD as we go._
- **Backend / Flask + PostgreSQL (Rob, Part B):** _TBD_

## What worked well
- Using AI as a **quiz partner** rather than an answer key surfaced real gaps (e.g. which side of
  a one-to-many holds the foreign key) that passive re-reading had hidden.
- _More to add as we build._

## What didn't / needed correction
- _TBD as we build._

_Note: per the project brief, no fixed proportion of code must be hand-written — grading is on
quality, functionality, and how well it meets the SRS. This log is kept specific and truthful._
