CREATE TABLE items (
    item_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    produced_in JSON NOT NULL,
    consumed_in JSON NOT NULL
);

CREATE TABLE recipes (
    recipe_id VARCHAR(255) PRIMARY KEY,
    schematic_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    ingredients JSON NOT NULL,
    products JSON NOT NULL,
    buildings JSON NOT NULL,
    duration_manual INTEGER NOT NULL,
    duration_manufacturing INTEGER NOT NULL
);
