CREATE DATABASE rs3items;

DROP TABLE IF EXISTS items;

CREATE TABLE items (
    item_id INTEGER PRIMARY KEY,
    prices INTEGER[],
    valuation_week FLOAT(2),
    valuation_month FLOAT(2),
    valuation_long_term FLOAT(2),
    cvar_week FLOAT(2),
    cvar_month FLOAT(2),
    cvar_long_term FLOAT(2),
    highest_price_week FLOAT(4),
    lowest_price_week FLOAT(4),
    item_name VARCHAR(255),
    item_image_uri VARCHAR(255),
    buy_limit INTEGER,
    item_type TEXT[],
    item_sub_type TEXT[]
);

CREATE TABLE update_date (
    runedate VARCHAR(255) UNIQUE,
    update_epoch VARCHAR(255) UNIQUE,
    item_count VARCHAR(255)
);