CREATE DATABASE rs3items;

DROP TABLE IF EXISTS items;

CREATE TABLE items (
    item_id VARCHAR(255) PRIMARY KEY,
    prices INTEGER[],
    undervaluation FLOAT(2),
    cvar_week FLOAT(2),
    cvar_month FLOAT(2),
    highest_price_week FLOAT(4),
    lowest_price_week FLOAT(4),
    item_name VARCHAR(255),
    item_image_uri VARCHAR(255),
    buy_limit VARCHAR(255),
    item_type VARCHAR(255),
    item_sub_type VARCHAR(255)
)