SELECT vehicles.make, vehicles.model
FROM users
INNER JOIN vehicles ON users.id=vehicles.owner_id
WHERE users.name LIKE $1;