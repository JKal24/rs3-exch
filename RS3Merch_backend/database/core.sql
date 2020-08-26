CREATE DATABASE IF NOT EXISTS rs3items

DROP TABLE IF EXISTS items 

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL UNIQUE,
    priceOneDay: FLOAT(4) NOT NULL,
    priceThreeDay: FLOAT(4),
    priceWeek: FLOAT(4),
    priceMonth: FLOAT(4),
    priceThreeMonths: FLOAT(4),
    buylimit: SMALLINT NOT NULL,
    item_type: VARCHAR(255),
    deviationMonth: FLOAT(2),
    deviationThreeMonths: FLOAT(2)
)