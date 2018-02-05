SELECT COUNT(make)
FROM vehicles
WHERE owner_id = $1;