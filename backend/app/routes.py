import re
from datetime import datetime

from flask import Blueprint, jsonify, request
from sqlalchemy import func, select
from sqlalchemy.exc import SQLAlchemyError

from app import db
from app.models import Availability, Customer, Reservation

api = Blueprint("api", __name__, url_prefix="/api")

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
MAX_PARTY_SIZE = 4


def _clean(value):
    return (value or "").strip()


@api.route("/newsletter", methods=["POST"])
def newsletter_signup():
    data = request.get_json(silent=True) or {}
    name = _clean(data.get("name"))
    email = _clean(data.get("email"))
    phone = _clean(data.get("phone")) or None

    if not name or not email:
        return jsonify({"error": "Name and email are required."}), 400
    if not EMAIL_RE.match(email):
        return jsonify({"error": "Please provide a valid email address."}), 400

    customer = Customer(
        customer_name=name,
        customer_email=email,
        phone_number=phone,
        newsletter_signup=True,
    )
    db.session.add(customer)
    db.session.commit()

    return jsonify({"message": "You're subscribed to the Café Fausse newsletter!"}), 201


@api.route("/reserve", methods=["POST"])
def create_reservation():
    data = request.get_json(silent=True) or {}

    time_slot_raw = _clean(data.get("timeSlot"))
    name = _clean(data.get("name"))
    email = _clean(data.get("email"))
    phone = _clean(data.get("phone")) or None
    guests = data.get("guests")

    if not time_slot_raw or not name or not email or guests in (None, ""):
        return jsonify({"error": "Time slot, guests, name, and email are required."}), 400
    if not EMAIL_RE.match(email):
        return jsonify({"error": "Please provide a valid email address."}), 400

    try:
        guests = int(guests)
    except (TypeError, ValueError):
        return jsonify({"error": "Number of guests must be a number."}), 400
    if not 1 <= guests <= MAX_PARTY_SIZE:
        return jsonify(
            {"error": f"Parties must be between 1 and {MAX_PARTY_SIZE} guests per table."}
        ), 400

    try:
        time_slot = datetime.fromisoformat(time_slot_raw)
    except ValueError:
        return jsonify({"error": "Time slot is not a valid date/time."}), 400

    slot_exists = db.session.execute(
        select(Availability.availability_id).where(Availability.timeslot == time_slot)
    ).first()
    if slot_exists is None:
        return jsonify({"error": "Selected time slot is not a valid reservation time."}), 400

    try:
        slot = db.session.execute(
            select(Availability)
            .where(Availability.timeslot == time_slot, Availability.reserved.is_(False))
            .order_by(func.random())
            .limit(1)
            .with_for_update(skip_locked=True)
        ).scalar_one_or_none()

        if slot is None:
            db.session.rollback()
            return jsonify(
                {"error": "That time slot is fully booked. Please choose another time."}
            ), 409

        customer = Customer(
            customer_name=name,
            customer_email=email,
            phone_number=phone,
            newsletter_signup=bool(data.get("newsletterSignup", False)),
        )
        db.session.add(customer)
        db.session.flush()

        reservation = Reservation(
            customer_id=customer.customer_id,
            time_slot=time_slot,
            table_number=slot.table_number,
        )
        db.session.add(reservation)
        db.session.flush()

        slot.reserved = True
        slot.reservation_id = reservation.reservation_id

        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({"error": "Something went wrong while booking. Please try again."}), 500

    return jsonify(
        {
            "message": "Reservation confirmed!",
            "reservationId": reservation.reservation_id,
            "tableNumber": reservation.table_number,
            "timeSlot": time_slot.isoformat(),
        }
    ), 201
