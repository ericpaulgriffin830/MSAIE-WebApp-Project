# Chris's Notes — 2-1 Web Application Foundations

> My own notes taken while working through the Quantic module, prior to building. Kept in my
> own words as evidence of my understanding. Studied/quizzed via the study log in this folder.

## Web App Basics
- **Goals:** distinguish client vs server; static web page vs dynamic web app; identify the two main components of a modern web app (front end and back end)
- Computers play one of two roles: **Client** or **server**
  - **Clients** — make requests to servers. Request types: read, create, edit, or delete
  - **Servers** — respond to client requests
    - Must respond to many requests at once and store large amounts of data → often run on powerful computers, ideally always online
    - A server can store and edit information using a **database** — an organized collection of information accessed by queries
    - Early days: mostly **static web pages** — every visitor served the exact same content. One request, one response
    - Now: **dynamic web apps** — tailor content to each user. Require ways to connect user input to a database, databases to store user information, and a system for usernames/passwords
- **Front end** — the client-side code, what the user sees
- **Back end** — the server side (features unseen by the user). Users interact indirectly with the back end via the front end. Two sides of the same coin.

## Front Ends and Native Apps
- **Goals:** functions a front end supports; responsive design; web browsers vs native apps
- Core task of front-end engineers is building **user interfaces (UI)** — everything a user sees and interacts with. The point of contact between human and machine, built in code.
- **User experience (UX)** — UX designers focus on how the interface feels: button placement, how users flow through screens, which elements grab attention
- Three languages to translate designs into functional web pages:
  - **HTML** — structure and basic content (text, images, hyperlinks)
  - **CSS** — colors, fonts, layouts, overall look and feel
  - **JavaScript (JS)** — makes the page interactive
- Front-end engineers ensure the app can read and interact with back-end data
- **Responsive design** — styling web content to fit multiple screen widths
- Browser vs native:
  - **Browser-based app** — accessed through a web browser
  - **Native app** — runs directly on a device's OS. Costlier/slower to build but: can run offline, run faster, and access device internals (calendar, photos, camera)

## Back Ends and APIs
- **Goals:** what an API is and how it works; business logic; HTTP protocol functions
- **Application Programming Interface (API)** — connects the front end to back-end resources: databases, other APIs, and business logic. Can also connect to other APIs.
- APIs front an app's **business logic** — the internal ruleset that governs how data flows through the app. APIs can be written in many languages.
- **Hypertext Transfer Protocol (HTTP)** — a procedure for sharing data that both clients and servers understand
- **API endpoint** — an address (like a URL) that returns a resource from the service, e.g. `http://api.dogswithjobs.com/jobs/nyc`

## Databases
- **Goals:** relational database concepts; how big data changed DB engineering; what non-relational DBs solve
- **Database** — an organized collection of information accessed by queries
- **Relational database** — multiple tables related via ID numbers
  - **SQL** — a simple way to pose questions to databases; can combine data from multiple tables in one response. Relational DBs are often called SQL databases.
  - Limits showed ~mid-2000s due to **Big data** — data so large/complex it can't be managed traditionally. The **three Vs**:
    - **Velocity** — generated quickly
    - **Volume** — takes up a lot of space
    - **Variety** — diverse types of data
  - Relational DBs struggled: hard to spread tightly-linked tables across servers (volume); too structured for variety
- **Non-relational (NoSQL, "Not Only SQL")** databases — more flexible/scalable
  - Data can be less structured; easier to distribute across computers (document, graph, key-value, wide-column)
  - Downsides: less mature; not standardized, so switching providers is hard

## Web Frameworks
- **Web frameworks** — prebuilt sets of tools/resources for building and managing web apps; avoid reinventing tools. Enhance **developer experience (DX)**.
- **UI frameworks** — pre-built elements to style sites; speed development, ease collaboration; apps tend to look similar; risk of using without understanding basics
- **JavaScript frameworks** — foundation for complex dynamic apps; manage information flow and component load order (front end)
- **Back-end frameworks** — server-side tools to get an API accepting/returning HTTP quickly. Big/elaborate (power, scale) vs lightweight/simple (fast start, harder to maintain as it grows)
- **Microframework** — much smaller than average; smooth DX without sacrificing control of architecture

## Cyber Security
- **Goals:** ethical hacking; common techniques and prevention
- **Penetration testing** — identify entry points, share vulnerabilities with admins (ethical hackers)
- Consequences of being hacked: harder to gain customers, harm to users, loss of existing customers, expensive recovery
- **Attack surface** — the sum of all vulnerabilities; total area exposed to an adversary
  - **SQL injection** — attacker enters special text into an input field to run harmful commands and access/change stored info. Prevented by **sanitizing input**.
  - **Encryption** — temporary translation of data into unreadable form; decrypted at destination. `https` → the "s" means secure/encrypted.
  - **Brute force attack** — try every possible key combination to crack passwords. Blocked by limiting login attempts.
  - **Multi-factor authentication (MFA)** — require more than one proof of identity at login
  - **Distributed Denial of Service (DDoS)** — bots flood the server with requests to take the site offline. Stopped by blocking suspicious traffic and increasing capacity.
  - **Social engineering** — manipulating people to gain unauthorized access
