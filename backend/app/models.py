from sqlalchemy import Computed
from sqlalchemy.dialects.postgresql import ExcludeConstraint, TSRANGE

from app import db


class RestaurantTable(db.Model):
    __tablename__ = "tables"

    table_number = db.Column(db.Integer, primary_key=True)
    seat_capacity = db.Column(db.Integer, nullable=False, default=4)


class Customer(db.Model):
    __tablename__ = "customers"

    customer_id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(80), nullable=False)
    customer_email = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(20), nullable=True)
    newsletter_signup = db.Column(db.Boolean, nullable=False, default=False)

    reservations = db.relationship("Reservation", back_populates="customer")


class Reservation(db.Model):
    __tablename__ = "reservations"
    __table_args__ = (
        ExcludeConstraint(
            ("table_number", "="),
            ("reservation_period", "&&"),
            using="gist",
            name="no_overlapping_reservations",
        ),
    )

    reservation_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(
        db.Integer, db.ForeignKey("customers.customer_id"), nullable=False
    )
    time_slot = db.Column(db.DateTime, nullable=False)
    table_number = db.Column(
        db.Integer, db.ForeignKey("tables.table_number"), nullable=False
    )
    # A table is occupied for a full 2 hours starting at time_slot. Postgres maintains
    # this range for us so the exclusion constraint below can enforce no overlaps.
    reservation_period = db.Column(
        TSRANGE,
        Computed("tsrange(time_slot, time_slot + interval '2 hours')", persisted=True),
    )

    customer = db.relationship("Customer", back_populates="reservations")
