# Chris's Notes — 2-2 Interactive Web Pages

> My own notes taken while working through the Quantic module, prior to building.

## JavaScript Fundamentals, Part 1
- **Goals:** connect JS to an HTML document; use `console.log` and `alert`; basic JS syntax
- JavaScript implements interactivity, behavior, and logic of a web page
  - Connect an external `.js` file via the `<script>` tag
  - `alert()` — displays a pop-up message in the browser
  - `console.log()` — logs information in the browser's console (important for debugging)
  - Variables declared with `var`, `let`, or `const`
    - `var` — outdated since ES6 (2015)
    - `const` — use when the value won't change
    - `let` — use when you expect changes
  - The list data type is an **array**: `let fruits = ["Cherry", "Orange"]`; first item = `console.log(fruits[0])`
  - Syntax: `{}` = code block; `()` = functions / grouping expressions; `;` = end of a statement
  - **`for` loops** — three statements in parentheses separated by semicolons:
    - statement 1: run once before the first iteration; initialize a variable
    - statement 2: condition for continued iteration
    - statement 3: increments the variable

## JavaScript Fundamentals, Part 2
- **Goals:** define a function; scope, hoisting, synchronicity; `setTimeout`
- Functions accept **parameters**; when called, values are passed as **arguments**. Use `return` to return a value (like Python).
- **Scope** — where a variable can be seen/accessed
  - **Block scope** — a variable declared inside a code block with `let`/`const`; only referenced within that block
  - **Global scope** — declared outside all blocks/functions; referenced anywhere
  - Avoid referencing a variable before it's declared
  - **Hoisting** — function definitions are hoisted to the top of the script before execution, so you can call a function before it's declared
- **Synchronicity** — the order statements execute
  - JS is synchronous: one statement at a time, top to bottom
  - **Asynchronous** functions can execute out of order; other statements don't wait (e.g. `setTimeout`)

## JavaScript Objects
- **Goals:** object literals and constructor functions; prototypal inheritance
- **Document Object Model (DOM)** — a tree-like structure a browser interprets an HTML document into. Lets external scripts manipulate page content via JS properties/methods of each object.
  - **Nodes** — objects in the DOM. Main types: Document, Element, Attribute, Text
    - **Document node** — the entire HTML document; entry point to the DOM
      - `querySelector()` — returns the first matching element node (select by class `.` or ID `#`, like CSS)
      - `$` prefix on a variable = a referenced DOM node
      - `textContent` — change the contents of an element
      - `<script src="dom.js" defer></script>` — defer so JS runs after the HTML
      - `getElementsByTagName()` — returns an array of every matching element node (vs `querySelector` = first only)
      - `setAttribute()` — assign a new attribute (name, value); commonly used to change an element's class/style

## The Document Object Model
- **Goals:** define the DOM; how properties/methods work; build a page that changes via interactive calls
- **Object** — stores data AND functionality. Wrapped in `{}`; name/value linked with `:`; definitions separated by `,`
  - **Property** — a characteristic of an object (data)
  - **Method** — an action the object can perform (functionality)
- **Object-oriented programming (OOP)** — organizing data and functionality into objects; most common paradigm
  - Update a property like a variable: `object.example = "new value"` (creates it if it doesn't exist)
  - Reference a property inside a method with the `this` keyword instead of the object name
  - **Object literals** — explicitly define each object's properties/methods (good for single objects)
  - **Constructor** — a function template for constructing objects; pass parameters that get assigned to each object's properties
  - **Prototypes** — built-in generic properties/methods that every object of a type inherits; always available

## Events and Forms
- **Goals:** event listeners; form/input/label elements; buttons and events
- **Events** — occurrences in a program's environment; can trigger function calls
  - `addEventListener` — listens for an event and runs a function. Two arguments: the event type, and a reference to a handler function
- **Form element** `<form>` — a section that provides controls for collecting user input
  - **Input element** — text boxes, checkboxes, file uploads, etc.
  - **Label element** — optional label paired with an input

## Interaction Design
- **Goals:** apply Jakob Nielsen's 10 usability heuristics; UX design vs interaction design
- **UX design** — every user-facing aspect (the entire experience)
- **Interaction design** — the interactive aspects specifically (how users and system communicate). Five aspects: **words, visuals, physical space, time, behavior**
- **Nielsen's 10 usability heuristics:** visibility of system status; match between system and real world; user control and freedom; consistency and standards; error prevention; recognition rather than recall; flexibility and efficiency of use; aesthetic and minimalist design; help users recognize/diagnose/recover from errors; help and documentation

## Front-End Libraries and Frameworks
- **Goals:** best practices; library vs framework; popular front-end frameworks; jQuery and React
- Best practices: create a README, add comments, organize code into files, don't repeat yourself, design before coding, use version control
- `import` / `export` — pass functionality between files
- **Library** — a collection of related code pulled from piecemeal for specific tasks (**micro libraries** = very small, single-purpose)
- **Framework** — a whole ecosystem of tools/standards that give an app structure (scaffolding)
- **jQuery** — the most popular JS library
- **React** — leading front-end framework; created by Meta, public 2013; shallow learning curve. Tutorials: https://react.dev/learn
