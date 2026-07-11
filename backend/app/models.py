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

    reservation_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(
        db.Integer, db.ForeignKey("customers.customer_id"), nullable=False
    )
    time_slot = db.Column(db.DateTime, nullable=False)
    table_number = db.Column(
        db.Integer, db.ForeignKey("tables.table_number"), nullable=False
    )

    customer = db.relationship("Customer", back_populates="reservations")
    availability_slot = db.relationship(
        "Availability", back_populates="reservation", uselist=False
    )


class Availability(db.Model):
    __tablename__ = "availability"
    __table_args__ = (
        db.UniqueConstraint("table_number", "timeslot", name="uq_table_timeslot"),
    )

    availability_id = db.Column(db.Integer, primary_key=True)
    table_number = db.Column(
        db.Integer, db.ForeignKey("tables.table_number"), nullable=False
    )
    timeslot = db.Column(db.DateTime, nullable=False)
    reservation_id = db.Column(
        db.Integer, db.ForeignKey("reservations.reservation_id"), nullable=True
    )
    reserved = db.Column(db.Boolean, nullable=False, default=False)

    reservation = db.relationship("Reservation", back_populates="availability_slot")
