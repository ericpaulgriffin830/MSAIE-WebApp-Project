# Chris's Notes — 2-4 Back Ends

> My own notes taken while working through the Quantic module, prior to building. This module
> maps directly onto our Café Fausse stack (Flask, ORM, REST/JSON, React).

## Introduction to Flask
- **Goals:** front vs back end review; Flask as a back-end microframework; local Flask setup; the HTTP request/response cycle
- **Framework** — tools/techniques to create, maintain, and scale web apps
- **Flask** — Python microframework, simple and lightweight: robust docs, security extensions, quick simple apps, handles many requests, caching extension
- **Virtual environment** — a simulated environment isolated from the rest of the machine; prevents dependency conflicts. Steps: install Python 3.6+, upgrade pip, `pip install virtualenv`, make/cd a directory, create venv, activate, `pip install flask`
- Minimal app:
  ```python
  from flask import Flask
  app = Flask(__name__)
  @app.route("/", methods=["GET"])
  def welcome():
      return "Welcome to Wholly Roasters!"
  ```
  Run with `flask run`
- This creates an **application server** that handles HTTP requests/responses and provides business logic
- Client-server model runs on HTTP. Two common methods: **GET** (retrieve data), **POST** (send data, often causing a change)

## Dynamic Templating with Flask
- **Goals:** connect front end to Flask; template inheritance; Jinja2 blocks/variables; MVC
- In Flask, HTML files = **templates**; CSS/JS/images = **static assets**. Flask expects `static/` and `templates/` folders.
- `return render_template("home.html")`
- **Base template** — limits redundant code; every page inherits it (shared HTML + a way to customize each page)
- **Jinja2** — Flask's templating engine; HTML + syntax to manipulate variables/expressions, replaced when rendered
  - Customizable parts = **blocks**: `{% block block_name %} ... {% endblock %}`
- **Architecture** — how an app's code/components interact
- **Model-View-Controller (MVC)** — separates UI from business logic:
  - **Model** — communicates with the database
  - **View** — builds the UI (HTML templates)
  - **Controller** — handles HTTP requests/responses; broker between Model and View (`app.py`)

## Forms and Error Handling
- **Goals:** integrate user input with back-end code; handle input errors; WTForms
- HTML elements for input: `<input>`, `<form>` (text, email, placeholder, type, label, button)
- `name` attribute — identifies the input value on submit (value won't submit without it)
- Successful POST → status code **200**
- **Request object** — the server converts POST data into an object storing client data as accessible attributes
- **Error handling** — check inputs meet requirements; notify user when they don't
- **Cross-Site Request Forgery (CSRF)** — a fake form mimics a POST to trick the server into giving up private data. Prevented with a **CSRF token** — random string attached to each form; submitted with the form to validate the POST.
- **WTForms** — a library for building/maintaining secure web forms (validation, error messages, security). Define a form class in `forms.py`, import into `app.py`, use `form.validate_on_submit()`.

## Connecting to a Database
- **Goals:** design a DB that integrates with the app; object-relational mapping
- Use SQLite for this course (relational, SQL); PostgreSQL to scale. Both beat NoSQL here because our data is structured.
- **Object-relational mapping (ORM)** — an object-based framework on top of the database; turns tables/records into objects so devs call methods on them. Fits MVC (Model → DB more intuitively).
- Enforce uniqueness: `unique = True` in the DB + display an error; e.g. `User.query.filter_by(username=username).first()`

## REST API
- **Goals:** six principles of REST; decouple back end from front end; apply RESTful principles
- Decoupling (deliver back end as an API the front end consumes): hire specialized engineers, split teams, scale separately, mix frameworks
- **Representational State Transfer (REST)** — rules standardizing how servers make data available. Key principles:
  1. **Client-server architecture** — front and back end separate
  2. **Uniform interface** — logical/standard way to fetch resources regardless of front end
  3. **Stateless** — server doesn't store data or remember client sessions; each request leaves the server unchanged (scalable; but each request must carry its session info)
  4. **Cacheable** — browser temporarily stores files locally → fewer client-server interactions, faster
  5. **Layered system** — deploy back end across server layers (proxies, load balancers) without impacting the front end
- **CRUD**: Create (PUT/POST), Read (GET), Update (PUT/POST/PATCH), Delete (DELETE)
- Decoupled → return **JSON** instead of HTML templates
  - **JavaScript Object Notation (JSON)** — lightweight key-value format, like a Python dict
  - `get_json()` — Flask method: extract JSON from a request object
  - `jsonify()` — Flask function: turn Python code into a JSON response object
- **Postman** — simulates front-end HTTP requests to test the back end independently

## Integrating ReactJS
- **Goals:** front-end code that integrates with the API; GET/POST in React; hooks, promises, handlers
- Back end = RESTful API returning JSON (GET `/admin` returns data; POST `/register` updates the DB)
- **ReactJS** — open-source JS library to make API calls from the front end (component-based)
- **axios** — library for GET requests: `axios.get("<URL>")`; `export default ApiService` / `import ApiService from "../service/api-service"`
- **React hooks** — add state/features to component functions:
  - **`useState`** — prepares a state to store API data; returns the current value + an updater function; argument = initial state; preserved between re-renders, resets on reload
  - **`useEffect`** — manages operations that can't run during rendering (e.g. fetching data); manages the call to the API
- **Promise** — an object standing in for pending values. States: **pending, fulfilled, rejected**. When fulfilled/rejected, the corresponding handler is called.
- **Handlers** — methods of a promise that run when its status changes: `.then()` (fulfilled → e.g. `setData(response.data)`), `.catch()` (rejected → log the error)

## Deployment
- **Goals:** deployment options; role of CDNs
- **Gunicorn** — simple Linux server software
- Front-end servers with HTTPS: **Tomcat** (Java enterprise), **Apache** (most popular, many modules), **Nginx** (heavy traffic)
- **IaaS** (lots to configure) vs **PaaS** (maintains the web server, auto-scaling, built-in security, costs more)
- **Containers** — isolated environments holding program code; small, quick to start, easy to move; tricky to keep many in sync. Good for static front end and stateless REST back end; tough for relational DBs (hard to scale horizontally).
- **Content delivery network (CDN)** — replicates static content across a geographically distributed network; serves a cached copy close to the user → better fault tolerance, lower latency
- **Hybrid approach** (usually best): **containers** for the back end, **CDN** for the static front end, **VM** for the database
