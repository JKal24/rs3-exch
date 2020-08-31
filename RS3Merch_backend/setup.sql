CREATE DATABASE rs3items;

DROP TABLE IF EXISTS items;

DROP TABLE IF EXISTS item_uris;

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(255),
    price_one_day VARCHAR(255),
    price_three_day VARCHAR(255),
    price_week VARCHAR(255),
    price_month VARCHAR(255),
    price_three_months VARCHAR(255),
    price_trajectory_week VARCHAR(255),
    price_trajectory_fortnight VARCHAR(255),
    price_trajectory_month VARCHAR(255),
    price_trajectory_three_months VARCHAR(255),
    undervaluation FLOAT(2),
    buy_limit VARCHAR(255),
    item_type VARCHAR(255),
    deviation_month FLOAT(2),
    deviation_three_months FLOAT(2)
);

CREATE TABLE item_uris (
    id SERIAL PRIMARY KEY,
    uri VARCHAR(255)
);