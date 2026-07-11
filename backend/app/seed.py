from datetime import date, datetime, timedelta

from sqlalchemy.dialects.postgresql import insert as pg_insert

from app import db
from app.models import Availability, RestaurantTable

TOTAL_TABLES = 30
SEAT_CAPACITY = 4
DAYS_AHEAD = 365
BATCH_SIZE = 1000

# Mon-Sat 5pm-11pm (three 2hr slots), Sunday 5pm-9pm (two 2hr slots).
# date.weekday(): Monday=0 ... Sunday=6.
SLOT_START_HOURS_BY_WEEKDAY = {
    0: (17, 19, 21),
    1: (17, 19, 21),
    2: (17, 19, 21),
    3: (17, 19, 21),
    4: (17, 19, 21),
    5: (17, 19, 21),
    6: (17, 19),
}


def seed_tables():
    rows = [
        {"table_number": n, "seat_capacity": SEAT_CAPACITY}
        for n in range(1, TOTAL_TABLES + 1)
    ]
    stmt = pg_insert(RestaurantTable.__table__).values(rows)
    stmt = stmt.on_conflict_do_nothing(index_elements=["table_number"])
    db.session.execute(stmt)
    db.session.commit()


def seed_availability(start_date=None):
    start_date = start_date or date.today()

    rows = []
    for day_offset in range(DAYS_AHEAD):
        day = start_date + timedelta(days=day_offset)
        for hour in SLOT_START_HOURS_BY_WEEKDAY[day.weekday()]:
            timeslot = datetime(day.year, day.month, day.day, hour)
            for table_number in range(1, TOTAL_TABLES + 1):
                rows.append(
                    {
                        "table_number": table_number,
                        "timeslot": timeslot,
                        "reservation_id": None,
                        "reserved": False,
                    }
                )

    for i in range(0, len(rows), BATCH_SIZE):
        batch = rows[i : i + BATCH_SIZE]
        stmt = pg_insert(Availability.__table__).values(batch)
        stmt = stmt.on_conflict_do_nothing(constraint="uq_table_timeslot")
        db.session.execute(stmt)
    db.session.commit()

    return len(rows)
