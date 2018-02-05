SELECT users.name, vehicles.make, vehicles.model, vehicles.year
FROM users
INNER JOIN vehicles ON users.id=vehicles.owner_id
WHERE vehicles.year > '2000'
ORDER BY vehicles.year desc;