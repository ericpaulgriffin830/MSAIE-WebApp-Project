SELECT *
FROM reservations
WHERE time_slot < '2026-07-21 17:00:00' OR time_slot > '2026-07-21 23:59:59';