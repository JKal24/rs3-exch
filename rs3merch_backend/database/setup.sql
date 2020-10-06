CREATE DATABASE rs3items;

DROP TABLE IF EXISTS item_uris;

DROP TABLE IF EXISTS favorite_items;

CREATE TABLE item_uris (
    id SERIAL PRIMARY KEY,
    uri VARCHAR(255) UNIQUE,
    buylimit VARCHAR(255)
);

CREATE TABLE favorite_items (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) UNIQUE,
    item_image_uri VARCHAR(255),
    buy_limit VARCHAR(255),
    price_today FLOAT(4),
    average FLOAT(4),
    undervaluation FLOAT(2),
    cvar_month FLOAT(2),
    highest_price_week FLOAT(4),
    lowest_price_week FLOAT(4),
    highest_price_month FLOAT(4),
    lowest_price_month FLOAT(4)
);