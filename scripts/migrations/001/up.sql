CREATE TABLE items (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    categories JSON NOT NULL,
    produced_in JSON NOT NULL,
    consumed_in JSON NOT NULL
);

CREATE TABLE recipes (
    id VARCHAR(255) PRIMARY KEY,
    schematic_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    categories JSON NOT NULL,
    ingredients JSON NOT NULL,
    products JSON NOT NULL,
    buildings JSON NOT NULL,
    duration JSON NOT NULL
);

CREATE TABLE schematics (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tier INT NOT NULL,
    categories JSON NOT NULL,
    recipes_ids JSON NOT NULL
);
