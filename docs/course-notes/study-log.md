# Study Log — Quantic AI Engineering

## Solid (confidently explained, low priority)
- Client vs. server + request types — last verified 2026-07-08
- Static vs. dynamic web app — last verified 2026-07-08
- SQL injection + prevention (sanitizing / parameterized queries) — last verified 2026-07-08
- Encryption + https — last verified 2026-07-08
- Brute-force + DDoS attacks and defenses — last verified 2026-07-08
- Web framework purpose (prebuilt tools, DX) — last verified 2026-07-08
- HTML's role (structure/content — skeleton) — last verified 2026-07-08
- Business logic (rules/decisions, distinct from storage) — last verified 2026-07-08
- console.log vs alert — last verified 2026-07-08
- for loop three statements — last verified 2026-07-08
- Parameters vs arguments — last verified 2026-07-08
- Block vs global scope — last verified 2026-07-08
- addEventListener (event type + handler by reference) — last verified 2026-07-08
- Library vs framework (you call library / framework calls you) — last verified 2026-07-08
- Hoisting (function definitions pulled to top) — last verified 2026-07-08
- Relational parts: attribute/record/primary key — last verified 2026-07-08
- ACID (Atomicity=all-or-nothing, Consistency, Isolation, Durability) — last verified 2026-07-08
- One-to-many + junction table — last verified 2026-07-08
- SQL constraints: UNIQUE, CHECK, NOT NULL — last verified 2026-07-08
- Inner join (Venn overlap — matches in both tables) — last verified 2026-07-08
- CTE (names a result set; readable/reusable) — last verified 2026-07-08
- Foreign-key triggers: CASCADE vs SET NULL — last verified 2026-07-08
- GROUP BY (one aggregate value per group — demonstrated w/ avg temp per county) — last verified 2026-07-08
- Normalization prevents duplicate data (redundancy) — RECOVERED, last verified 2026-07-08
- REST stateless principle (server remembers nothing; each request self-contained → scalable) — last verified 2026-07-08
- JSON + get_json() (data IN) / jsonify() (data OUT) — last verified 2026-07-08
- useState hook (returns [value, setter]; setter triggers re-render) — last verified 2026-07-08
- Promises (3 states: pending/fulfilled/rejected; .then handles success, .catch handles error) — last verified 2026-07-08
- ORM (tables/records → objects; call methods instead of raw SQL; SQLAlchemy) — last verified 2026-07-08

## Shaky (got it with hints or partial credit)
- Big data "three Vs" — 2026-07-08 — said "verification" instead of **Variety**
- Microframework — 2026-07-08 — "small" ≠ "only small apps"; minimal core + dev keeps control
- JavaScript's role — 2026-07-08 — tighten "dynamic content" to **interactive/behavior**
- const vs let default — 2026-07-08 — build the **const-first** habit
- Property vs method — 2026-07-08 — method = **any action/function**, not only "update"
- DOM — 2026-07-08 — firm up what it enables: select + read/change elements, attach events
- Many-to-many — 2026-07-08 — **many on BOTH sides**
- Virtual environment — 2026-07-08 — knew "isolated"; reason is **avoiding dependency/version conflicts**, not "safety"
- MVC Controller — 2026-07-08 — got Model/View; Controller = **handles HTTP requests + brokers Model↔View** (app.py/routes)
- CSRF — 2026-07-08 — had the token; missing the **attack definition** (fake form forging a POST)
- useEffect — 2026-07-08 — "manages API request" ok; the WHY = **side effects that can't run during render**

## Needs work (missed or could not explain)
- Foreign key — WHICH SIDE holds it — 2026-07-08 — missed TWICE; the **MANY side holds the FK** (reservations.customer_id → customers). Hook: "the many side carries the pointer."
- CRUD → HTTP verbs — 2026-07-08 — swapped Create/Read; Delete=DELETE. Correct: Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE. (Likely fatigue — had GET/POST right in session 1.)

## Missed quiz questions
- Q: The three Vs of big data — A: Volume, Velocity, Variety (said verification) — 2026-07-08
- Q: Which side holds the foreign key — A: the MANY side — 2026-07-08 (missed twice)
- Q: CRUD → HTTP verbs — A: POST/GET/PUT-PATCH/DELETE — 2026-07-08

## Session history
- 2026-07-08 — quick-quiz (10 Q) — Module 2-1 Web Application Foundations.
- 2026-07-08 — quick-quiz (2 revisit + 10 Q) — Module 2-2 Interactive Web Pages. Code: quanticedu/webfound2-interactive-web-pages.
- 2026-07-08 — quick-quiz (1 revisit + 10 Q) — Module 2-3 Relational Databases. Code: quanticedu/webfound3-relational-databases.
- 2026-07-08 — quick-quiz (2 revisit + 10 Q) — Module 2-4 Back Ends. Code: quanticedu/webfound4-back-ends. All 4 modules complete; next phase = BUILD Café Fausse Part C.
