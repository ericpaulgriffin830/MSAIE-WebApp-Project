# AI Tooling Summary

> **Required deliverable.** Quantic asks for a summary of any AI code-generation tooling used
> and how — what worked well, what didn't. Keep this updated as you build; the grader reads it.

## Tools used

The **User** column attributes each tool's use to a team member so graders can see who did what.

| Tool                                 | User         | Where used                                                                                                                                    | Notes                                                                                                                                          |
| ------------------------------------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Code (Opus)                   | Chris (C)    | (1) Studying the underlying concepts before building; (2) project setup, scaffolding, requirements traceability from the SRS, git/repo wiring | Used as a Socratic/Feynman study tutor across all four course modules, then to generate the repo structure, PLAN.md, README, merged .gitignore |
| _Claude Code (Sonnet)_             | _Rob (B)_  | (0) Design consultations;<br />(1) Building out the backend; (2) integrating parts A and C into a unified app; (3) Git commits                |                                                                                                                                                |
| Claude Code (Sonnet 5 and Haiku 4.5) | _Eric (A)_ | Generatign React component templates and structure                                                                                            |                                                                                                                                                |

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

### Phase 2 — Building the application

- **Requirements analysis:** loaded the SRS PDF into the AI tool and had it extract the exact
  functional requirements (FR-1…FR-18), menu items/prices, and DB schema so nothing was missed.
- **Scaffolding:** used Claude Code to lay out the repo structure, the build plan
  ([`docs/PLAN.md`](docs/PLAN.md)), README, and the git/remote workflow.
- **Frontend components / styling (Chris, Part C):** _built one piece at a time — with the AI
  explaining each step so the code is understood, not just generated.
- **Backend / Flask + PostgreSQL (Rob, Part B):**
  - Created a local folder for a git repository development enviornment.  Pulled Chris's initial changes into this code (and generated a git branch). Generated a robust set of requirements based on the SRS and Project instructions, as well as explained the context of group collaboration in Claude_PartB_Instructions.md.  Stored this and the SRS in the local folder.  Instructions included asking Claude to work only on Rob's portion initially.  Full context of project app and tech stack explained in the instructions.
  - Created a Claude Code session with access to the local folder.  Rob had some ideas for how to set up the database and use an *availability* table to log which tables were available, and chatted with Claude about implementation of the database backend prior to executing code.  Initial thoughts agreed with team were that a table should be booked for 2 hours, so each time slot was a fixed set of 2 hours.  2 hour time slots were hard-coded into the Reservation form and backend availability table at this point.
  - Rob worked wtih Claude directly to generate the backend code and run tests in the database.  Claude initialized the tables and populated them.  Rob also used Claude to insert records to fully book July 21, 2026 for demo testing in the live presentation.
  - After Chris and Eric's portions were complete, Rob worked with Claude to merge their branches into 1 functioning app, and reconcile potential conflicts.
  - Lastly, Rob reviewed the final app and suggested it would present a better user experience to allow users to sign up in more frequent increments.  Chris and Eric agreed, and so Rob worked with Claude to support this feature.  The *availability* table was dropped, and a column added to the reservation to manage the start/end time of the reservation.  Logic for avoiding conflicts was moved from Postgres to the Python backend.
- **Frontend components (Eric, Part A):**
  - Generated initial React page component templates (Home.jsx, Menu.jsx, AboutUs.jsx)
  - Created CSS styling with responsive design
  - Provided Navigation component and React Router setup
  - Guided on project structure and best practices

## What worked well

- Chris - Using AI as a **quiz partner** rather than an answer key surfaced real gaps (e.g. which side of a one-to-many holds the foreign key) that passive re-reading had hidden.
- Rob - Using AI to discuss implementation architecture of the database, as well as pros and cons of restructuring to accommodate the added functionality for more time slots.
- Rob - Claude was great at checking versions and identifying potential conflicts between files when integrated the 3 parts.  Rob used Claude to handle most of the git commits and code authoring.  Claude also cross-referenced the SRS and was able to identify when humans agreed to a design implementation that went against the SRS.
- Eric - For the front end, templates were a good starting point.  The CSS was responsive and functional.  Claude gave clear explanations of React concepts, and saved significant setup time.

## What didn't / needed correction

- Eric - For the frontend, some file paths needed manual adjustment.
- Eric - Claude generated a lot of React code.  We needed to consult the React documentation to understand better what the code was doing.

* Chris - Claude Opus 4.8 put the reservation page and the gallery together. Reprompting corrected the issues
* Chris - Integrating the CSS on all the pages wasn't quite seemless. Once all the pages were properly linked, the code needed to be adjusted to show a cohesive design with Claude Opus 4.8.
* Chris - The initial design with CSS was generic, additional prompting created the visual feel that the group appriciated.
* Rob - Claude worked very well given the detailed instructions above.  The only observation would be that it does generate a lot of code, which we need to read to fully understand, but it was helpful in explaining how to spin up and run that code.

_Note: per the project brief, no fixed proportion of code must be hand-written — grading is on
quality, functionality, and how well it meets the SRS. This log is kept specific and truthful._
