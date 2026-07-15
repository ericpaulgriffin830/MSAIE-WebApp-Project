SELECT *
FROM customers
WHERE customer_name NOT LIKE 'Demo%'
ORDER BY customer_id;