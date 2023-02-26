
DROP DATABASE parcel_db;
CREATE DATABASE parcel_db;
USE parcel_db;

DROP TABLE mytable;

CREATE TABLE  mytable (
  pin INT(10),
  address VARCHAR(255),
  owner VARCHAR(255),
  market_value DECIMAL(10,2),
  sale_date DATE,
  sale_price DECIMAL(10,2),
  link VARCHAR(255),
  maplink VARCHAR(225)

);

-- load data from text file into the mytable table
LOAD DATA LOCAL INFILE '/Users/keltonLeach/Documents/assessments/raf-tech-assessment/db/Parcels.txt'
INTO TABLE mytable
FIELDS TERMINATED BY '|'
LINES TERMINATED BY '\n'
(PIN, ADDRESS, OWNER, MARKET_VALUE, @SALE_DATE, SALE_PRICE, LINK)
SET sale_date = STR_TO_DATE(@SALE_DATE, '%m/%d/%Y'),
maplink = CONCAT('https://www.google.com/maps/embed/v1/place?key=', 'AIzaSyBitp-D5fzf3sFeHVQ8idSV62EFjf6y5AM', '&q=', REPLACE(ADDRESS, ' ', '+'));
