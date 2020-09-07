CREATE DATABASE rs3items;

DROP TABLE IF EXISTS items;

DROP TABLE IF EXISTS item_uris;

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(255),
    item_image_uri VARCHAR(255),
    buy_limit float(2),
    price_today float(4),
    undervaluation float(2),
    cvar_month float(2),
    highest_price_week float(4),
    lowest_price_week float(4),
    highest_price_month float(4),
    lowest_price_month float(4)
);

CREATE TABLE item_uris (
    id SERIAL PRIMARY KEY,
    uri VARCHAR(255) UNIQUE,
    item_type VARCHAR(255)
);