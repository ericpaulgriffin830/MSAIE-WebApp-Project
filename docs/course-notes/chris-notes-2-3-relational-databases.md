# Chris's Notes — 2-3 Relational Databases

> My own notes taken while working through the Quantic module, prior to building.

## Intro to Databases
- **Goals:** key parts of a relational DB; relational vs non-relational; ACID properties
- **Database** — an organized collection of electronic information accessed via computing devices. Scalable, accurate, secure, manipulable.
- **Relational database** — interconnected tables. Key parts:
  - **Attribute** — a column
  - **Record** — a row
  - **Primary key** — a unique ID for each record
  - **Data value** — a single piece of data
- **SQL** — create, manage, manipulate a database (structure, settings, security, info)
  - **Query** — a request for information
  - **View** — a filtered set of data formatted for display
  - **Stored procedure** — a precompiled SQL statement that automates routine tasks
  - **Index** — a data structure that labels data to speed up queries
- **Transaction** — a set of DB operations that work as a unit. Reliable DBs are **ACID compliant**:
  - **Atomicity** — multi-part transactions succeed only if all parts succeed
  - **Consistency** — the DB is correct before and after every transaction
  - **Isolation** — concurrent transactions kept separate to prevent errors
  - **Durability** — once written, data is permanent
- **Non-relational database** — flexibility for unstructured data, schema change, incomplete data, scale

## Designing a Relational Database (six steps)
1. **Define mission & objectives** — why am I making this database? Objectives come from its users.
2. **Analyze data requirements** — understand what's already collected (spreadsheets, paper) and how to improve it
3. **Create an ER diagram** — **Entity-Relationship diagram**: a roadmap of data and relationships (business side, not implementation)
   - **Entities** — become tables; nouns/objects/events; each has a unique identifier
   - **Attributes** — characteristics of entities
   - Relationships: **one-to-many**, **many-to-many**, **one-to-one** (rare)
4. **Create a relational schema**
5. **Normalize the schema**
6. **Check your work**

## Designing a Relational Database, Part 2
- **Business rules** — org-specific rules for data (on an attribute or on relationships). Compile business rules, entities, attributes, relationships into a **data dictionary**.
- **Relational schema** — how tables are built/connected (use "table"/"column" instead of "entity"/"attribute")
  - **Primary key** criteria: not null, unique, not reliant on sensitive personal info, not modified often. **Composite primary key** = two or more attributes. Common to generate ID numbers/codes.
  - Table names first; columns in parentheses; primary keys underlined
  - **Junction table** — a third table turning a many-to-many into multiple many-to-one relationships
  - **Foreign keys** — attributes that reference the primary key of another table
  - Steps: map each entity → table (identifier = PK); one-to-many → PK of one becomes FK in the other; many-to-many → junction table with both PKs as FKs
- **Normalization** — the process of ensuring **data integrity** (accuracy, completeness, consistency). Goals: maintain consistency; prevent **data redundancy** (store data once, reference with FKs); ensure proper data dependencies
  - **1NF** — each column name unique; each value holds one piece of data; each column one format
  - **2NF** — eliminate partial dependency (composite PK with a column depending on only part of it)
  - **3NF** — avoid transitive dependency (a column depending on another column more than the PK)
- **Check your work** — one entity per table? duplicate columns? relationships sensible? constraints work?

## Building a Database
- SQL rules: end commands with `;`; prefers single quotes; case-insensitive but keywords uppercase by convention
- `CREATE TABLE tablename ( column1 DATATYPE CONSTRAINT, ... );`
- **Constraints** — rules for data in a column:
  - `CHECK` — Boolean expression; only True values allowed
  - `UNIQUE` — no repeating values
  - `NOT NULL` — value can't be NULL
  - `PRIMARY KEY` / `FOREIGN KEY` — added later (faster to index after import; hard to relate to tables that don't exist yet)
- Comments: `/* ... */` or `--`
- Insert data via CSV import or `INSERT INTO`

## Modifying a Database
- **Create a foreign key:** `ALTER TABLE ... ADD CONSTRAINT ... FOREIGN KEY (col) REFERENCES other(col)`
- Tell the DB what to do when the referenced PK changes/deletes → a **trigger** (action/stored procedure that runs on a condition)
  - Conditions: `ON DELETE`, `ON UPDATE`
  - Actions: `SET NULL` (references become NULL), `CASCADE` (apply change to every associated record)

## Queries
- `SELECT * FROM person;` — columns after SELECT, table after FROM
- **Aliases** — `SELECT col AS alias FROM table;`
- **Concatenate** — `CONCAT(item1, item2)` or `item1 || item2`
- **Wildcards** — `%` = zero or more characters; `_` = exactly one; used with `LIKE`
- Filter with `WHERE`

## Joins and CTEs
- **Inner join** — only records in both tables (most common)
- **Left join** — all records in the first table + any in both
- **Right join** — all records in the second table + any in both
- **Outer join** — all records in both tables
- Syntax: `SELECT ... FROM table1 JOIN table2 ON table1.col = table2.col;` (JOIN defaults to INNER)
- **Subquery** — a query in parentheses nested inside another
- **Common table expression (CTE)** — names a result set, callable inside another query; more readable/reusable. `WITH name AS (query)`; multiple CTEs separated by commas

## Formatting Result Sets & Efficient Queries
- `ORDER BY` — order of results (`DESC` for descending)
- `LIMIT` — cap how many records returned
- **Database context** — the connection at the top of the query window
- **Record locking** — prevents two transactions modifying/deleting the same record
