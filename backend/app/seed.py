from sqlalchemy.dialects.postgresql import insert as pg_insert

from app import db
from app.models import RestaurantTable

TOTAL_TABLES = 30
SEAT_CAPACITY = 4


def seed_tables():
    rows = [
        {"table_number": n, "seat_capacity": SEAT_CAPACITY}
        for n in range(1, TOTAL_TABLES + 1)
    ]
    stmt = pg_insert(RestaurantTable.__table__).values(rows)
    stmt = stmt.on_conflict_do_nothing(index_elements=["table_number"])
    db.session.execute(stmt)
    db.session.commit()
