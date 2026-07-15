SELECT c.customer_ID, c.customer_name, c.customer_email, r.reservation_id, r.time_slot, r.table_number
FROM customers c
JOIN reservations r
ON r.customer_id = c.customer_id
WHERE r.time_slot < '2026-07-21 17:00:00' OR r.time_slot > '2026-07-21 23:59:59';