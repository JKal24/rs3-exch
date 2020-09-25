CREATE DATABASE rs3items;

DROP TABLE IF EXISTS item_uris;

CREATE TABLE item_uris (
    id SERIAL PRIMARY KEY,
    uri VARCHAR(255) UNIQUE,
    buy_limit VARCHAR(255)
);