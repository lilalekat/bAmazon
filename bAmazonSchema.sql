DROP DATABASE IF EXISTS bAmazon_DB;
CREATE DATABASE bAmazon_DB;

USE bAmazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crayola Triangle Crayons", "Arts & Crafts", 4, 20),
("Kano Computer Kit Touch", "STEM", 195, 2),
("Toddler Girl School Uniform", "Kids Clothing", 7, 30),
("Baby Shark Critter Backpack", "Kids Clothing", 10, 10),
("Boy Uniform Short Sleeve", "Kids Clothing", 10, 12),
("Galaxy Slime Starter Pack", "Arts & Crafts", 6, 17),
("Play Doh", "Arts & Crafts", 15, 3),
("Crayola Washabble Markers", "Arts & Crafts", 7, 5),
("Toddler Boy School Uniform", "Kids Clothing", 7, 10),
("SmartWatch 2.0", "STEM", 35, 1);

