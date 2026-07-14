import random
import re
from datetime import datetime, time, timedelta

from flask import Blueprint, jsonify, request
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

from app import db
from app.models import Customer, Reservation

api = Blueprint("api", __name__, url_prefix="/api")

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
MAX_PARTY_SIZE = 4
TOTAL_TABLES = 30

# Reservations start on a 15-minute mark and run for a fixed 2 hours. The last
# valid start time is 2 hours before closing so no one is seated past close.
SLOT_INCREMENT_MINUTES = 15
RESERVATION_DURATION = timedelta(hours=2)
OPEN_TIME = time(17, 0)
LAST_START_MON_SAT = time(21, 0)
LAST_START_SUN = time(19, 0)


def _clean(value):
    return (value or "").strip()


def _ok(payload, status=201):
    return jsonify({"success": True, **payload}), status


def _error(message, status):
    return jsonify({"success": False, "error": message}), status


def _is_valid_start_time(dt):
    if dt.minute % SLOT_INCREMENT_MINUTES != 0 or dt.second != 0 or dt.microsecond != 0:
        return False
    last_start = LAST_START_SUN if dt.weekday() == 6 else LAST_START_MON_SAT
    return OPEN_TIME <= dt.time() <= last_start


@api.route("/newsletter", methods=["POST"])
def newsletter_signup():
    data = request.get_json(silent=True) or {}
    name = _clean(data.get("name"))
    email = _clean(data.get("email"))
    phone = _clean(data.get("phone")) or None

    if not name or not email:
        return _error("Name and email are required.", 400)
    if not EMAIL_RE.match(email):
        return _error("Please provide a valid email address.", 400)

    customer = db.session.execute(
        select(Customer)
        .where(Customer.customer_email == email)
        .order_by(Customer.customer_id)
    ).scalars().first()

    if customer is not None and customer.newsletter_signup:
        return _error("You're already subscribed.", 409)

    if customer is not None:
        customer.newsletter_signup = True
        customer.customer_name = name
    else:
        customer = Customer(
            customer_name=name,
            customer_email=email,
            phone_number=phone,
            newsletter_signup=True,
        )
        db.session.add(customer)

    db.session.commit()

    return _ok({"message": "You're subscribed to the Café Fausse newsletter!"})


@api.route("/reservations", methods=["POST"])
def create_reservation():
    data = request.get_json(silent=True) or {}

    time_slot_raw = _clean(data.get("timeSlot"))
    name = _clean(data.get("name"))
    email = _clean(data.get("email"))
    phone = _clean(data.get("phone")) or None
    guests = data.get("guests")

    if not time_slot_raw or not name or not email or guests in (None, ""):
        return _error("Time slot, guests, name, and email are required.", 400)
    if not EMAIL_RE.match(email):
        return _error("Please provide a valid email address.", 400)

    try:
        guests = int(guests)
    except (TypeError, ValueError):
        return _error("Number of guests must be a number.", 400)
    if not 1 <= guests <= MAX_PARTY_SIZE:
        return _error(f"Parties must be between 1 and {MAX_PARTY_SIZE} guests per table.", 400)

    try:
        time_slot = datetime.fromisoformat(time_slot_raw)
    except ValueError:
        return _error("Time slot is not a valid date/time.", 400)

    if not _is_valid_start_time(time_slot):
        return _error("Selected time slot is not a valid reservation time.", 400)
    if time_slot <= datetime.now():
        return _error("Selected time slot must be in the future.", 400)

    requested_end = time_slot + RESERVATION_DURATION
    requested_start_lower_bound = time_slot - RESERVATION_DURATION

    try:
        conflicting = db.session.execute(
            select(Reservation.table_number).where(
                Reservation.time_slot < requested_end,
                Reservation.time_slot > requested_start_lower_bound,
            )
        ).scalars().all()

        free_tables = [n for n in range(1, TOTAL_TABLES + 1) if n not in set(conflicting)]
        random.shuffle(free_tables)

        if not free_tables:
            db.session.rollback()
            return _error("That time slot is fully booked. Please choose another time.", 409)

        customer = db.session.execute(
            select(Customer)
            .where(Customer.customer_email == email)
            .order_by(Customer.customer_id)
        ).scalars().first()

        if customer is None:
            customer = Customer(
                customer_name=name,
                customer_email=email,
                phone_number=phone,
                newsletter_signup=bool(data.get("newsletterSignup", False)),
            )
            db.session.add(customer)
            db.session.flush()
        else:
            customer.customer_name = name
            if phone:
                customer.phone_number = phone

        # Try candidate tables in random order; the exclusion constraint is the
        # real safety net if two requests race for the same table+time.
        reservation = None
        for table_number in free_tables:
            savepoint = db.session.begin_nested()
            try:
                reservation = Reservation(
                    customer_id=customer.customer_id,
                    time_slot=time_slot,
                    table_number=table_number,
                )
                db.session.add(reservation)
                db.session.flush()
                savepoint.commit()
                break
            except IntegrityError:
                savepoint.rollback()
                reservation = None

        if reservation is None:
            db.session.rollback()
            return _error("That time slot is fully booked. Please choose another time.", 409)

        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        return _error("Something went wrong while booking. Please try again.", 500)

    return _ok(
        {
            "message": "Reservation confirmed!",
            "reservationId": reservation.reservation_id,
            "tableNumber": reservation.table_number,
            "timeSlot": time_slot.isoformat(),
        }
    )
