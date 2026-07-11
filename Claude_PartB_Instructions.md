
# General Instructions for Project

First, consider the fundamental functions the customer wants to see on the site:

- Contact information: Address, phone number, hours
- Their menu, broken up by categories
- An “About Us” page highlighting the owners
- An email sign-up for a newsletter
- A photo gallery page, and judicious use of photos throughout the site
- Something showcasing their awards and positive reviews
- An ability to make a table reservation via the Web site


# Software Requirements Specifications (SRS)

* When writing the code, please refer to the SRS document at **srs/MSEE_Web_Application_and_Interface_Design_Cafe_Fausse_SRS.pdf**.

# Specific Instructions for Rob's portion

* Rob is collaborating with 2 other group members via Github.  Each team member is working on a separate portion of the website.  They will merge their code into the main branch to run the app.
* The focus of each member is listed below:

| Member        | GitHub repo                                           | Focus                                                                       |
| ------------- | ----------------------------------------------------- | --------------------------------------------------------------------------- |
| Chris McCoy   | https://github.com/cmccoy2008/MSAIE-WebApp-Project    | Part C — reservation/gallery/newsletter forms, CSS theme/design system, QA |
| Rob Ottogalli | https://github.com/Rob-Ottogalli/MSAIE-WebApp-Project | Part B — Flask backend, PostgreSQL, reservation + newsletter logic         |
| Eric Griffin  | _repo TBD_ (`ericpaulgriffin830`)                 | Part A — Home/Menu/About Us pages + routing                                |

* When writing original code, please only work on the part assigned to Rob.  This will help with merge conflicts.

## Newsletter sign-up:

* Customer should be able to sign up to receive a newsletter.
* Upon signup, the customer's info goes into the Customer table of the database.  (See schema below for what the form should contain.)

## Reservations:

* Customer should be able to create a reservation request using forms on the front end.

  * This system should be able to select specific timeslots, input the number of guests, assign a name to the reservation, require an email address and an optional phone number and store this information in the system. It should also check to ensure the timeslot is not fully occupied.
  * The back-end logic should take the customer’s information, add it to the customer table, then assign a random available table for the chosen time slot (assume there are 30 tables total). Once completed, it should confirm to the user a successful reservation. If all seats are taken for that time slot, the system should send back a message that the customer needs to pick another time.
* Database schema:

  * Customers (Table)
    * Customer ID (int, primary key)
    * Customer Name (varchar 80)
    * Customer Email (varchar )
    * Phone Number (varchar )
    * Newsletter Signup (bool)
  * Reservations (Table)
    * Reservation ID (int, primary key)
    * Customer ID (int, forign key)
    * Time Slot (datetime)
    * Table Number (int, foreign key)
  * Availability (Table):
    * Table ID (int, primary key)
    * Reservation ID (int, foreign key)
    * Timeslot
    * Reserved (bool)
* Assume:

  * There are 30 tables.
  * Each table seats 4 people.

# Required tools:

* Front-end:
  * React.js
  * CSS
  * HTML
* Backend:
  * Python (Flask)
  * PostgreSQL (database)

# Reiteration

* **Again, please only work on the portion assigned to Rob.**
