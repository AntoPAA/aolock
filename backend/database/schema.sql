create table role (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  label VARCHAR(255) NOT NULL
);

create table size (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  label VARCHAR(255) NOT NULL
);

INSERT INTO size (label) VALUES ('XS');
INSERT INTO size (label) VALUES ('S');
INSERT INTO size (label) VALUES ('M');
INSERT INTO size (label) VALUES ('L');
INSERT INTO size (label) VALUES ('XL');
INSERT INTO size (label) VALUES ('XXL');

create table type (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  label VARCHAR(255) NOT NULL
);

INSERT INTO type (label) VALUES ('Type1');
INSERT INTO type (label) VALUES ('Type2');

create table season (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  label VARCHAR(255) NOT NULL
);

INSERT INTO season (label) VALUES ('Winter');
INSERT INTO season (label) VALUES ('Season2');

CREATE TABLE product (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  description TEXT NOT NULL,
  img_front VARCHAR(255) NOT NULL,
  img_back VARCHAR(255) NOT NULL,
  img_zoom VARCHAR(255) NULL,
  type_id INT,
  CONSTRAINT fk_product_by_type FOREIGN KEY (type_id) REFERENCES type(id) ON DELETE CASCADE,
  season_id INT,
  CONSTRAINT fk_product_by_season FOREIGN KEY (season_id) REFERENCES season(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO product (name, price, description, img_front, img_back, img_zoom, type_id, season_id) VALUES ('Product1', 19.99, 'Description for Product1', 'https://example.com/front1.jpg', 'https://example.com/back1.jpg', 'https://example.com/zoom1.jpg', 1, 1);
INSERT INTO product (name, price, description, img_front, img_back, img_zoom, type_id, season_id) VALUES ('Product2', 29.99, 'Description for Product2', 'https://example.com/front2.jpg', 'https://example.com/back2.jpg', 'https://example.com/zoom2.jpg', 2, 2);
INSERT INTO product (name, price, description, img_front, img_back, img_zoom, type_id, season_id) VALUES ('Product3', 39.99, 'Description for Product3', 'https://example.com/front3.jpg', 'https://example.com/back3.jpg', 'https://example.com/zoom3.jpg', 1, 2);
INSERT INTO product (name, price, description, img_front, img_back, img_zoom, type_id, season_id) VALUES ('Product4', 49.99, 'Description for Product4', 'https://example.com/front4.jpg', 'https://example.com/back4.jpg', 'https://example.com/zoom4.jpg', 2, 1);
INSERT INTO product (name, price, description, img_front, img_back, img_zoom, type_id, season_id) VALUES ('Product5', 59.99, 'Description for Product5', 'https://example.com/front5.jpg', 'https://example.com/back5.jpg', 'https://example.com/zoom5.jpg', 1, 2);
INSERT INTO product (name, price, description, img_front, img_back, img_zoom, type_id, season_id) VALUES ('Product6', 69.99, 'Description for Product6', 'https://example.com/front6.jpg', 'https://example.com/back6.jpg', 'https://example.com/zoom6.jpg', 2, 1);
INSERT INTO product (name, price, description, img_front, img_back, img_zoom, type_id, season_id) VALUES ('Product7', 79.99, 'Description for Product7', 'https://example.com/front7.jpg', 'https://example.com/back7.jpg', 'https://example.com/zoom7.jpg', 1, 2);
INSERT INTO product (name, price, description, img_front, img_back, img_zoom, type_id, season_id) VALUES ('Product8', 89.99, 'Description for Product8', 'https://example.com/front8.jpg', 'https://example.com/back8.jpg', 'https://example.com/zoom8.jpg', 2, 1);
INSERT INTO product (name, price, description, img_front, img_back, img_zoom, type_id, season_id) VALUES ('Product9', 99.99, 'Description for Product9', 'https://example.com/front9.jpg', 'https://example.com/back9.jpg', 'https://example.com/zoom9.jpg', 1, 2);
INSERT INTO product (name, price, description, img_front, img_back, img_zoom, type_id, season_id) VALUES ('Product10', 109.99, 'Description for Product10', 'https://example.com/front10.jpg', 'https://example.com/back10.jpg', 'https://example.com/zoom10.jpg', 2, 1);


CREATE TABLE size_by_product (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  size_id INT,
  product_id INT,
  FOREIGN KEY (size_id) REFERENCES size(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

INSERT INTO size_by_product (size_id, product_id) VALUES (1, 1);
INSERT INTO size_by_product (size_id, product_id) VALUES (2, 1);
INSERT INTO size_by_product (size_id, product_id) VALUES (3, 1);
INSERT INTO size_by_product (size_id, product_id) VALUES (4, 1);
INSERT INTO size_by_product (size_id, product_id) VALUES (5, 1);
INSERT INTO size_by_product (size_id, product_id) VALUES (6, 1);


CREATE TABLE stock (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  quantity INT NOT NULL,
  size_by_product_id INT,
  FOREIGN KEY (size_by_product_id) REFERENCES size_by_product(id) ON DELETE CASCADE
);

INSERT INTO stock (quantity, size_by_product_id) VALUES (10, 1);
INSERT INTO stock (quantity, size_by_product_id) VALUES (20, 2);
INSERT INTO stock (quantity, size_by_product_id) VALUES (15, 3);
INSERT INTO stock (quantity, size_by_product_id) VALUES (25, 4);
INSERT INTO stock (quantity, size_by_product_id) VALUES (18, 5);
INSERT INTO stock (quantity, size_by_product_id) VALUES (12, 6);

create table customer (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL unique,
  password VARCHAR(255) NOT NULL,
  role_id INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);