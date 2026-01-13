CREATE DATABASE shop_db;
USE shop_db;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price INT
);

CREATE TABLE stocks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  quantity INT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  quantity INT,
  total_price INT,
  status ENUM('ACTIVE','CANCELLED') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products (name, price) VALUES
('Keyboard', 250000),
('Mouse', 150000),
('Monitor', 2000000),
('Laptop Stand', 300000),
('Headset', 400000),
('Webcam', 500000),
('USB Hub', 120000),
('Microphone', 700000),
('Speaker', 350000),
('Mousepad', 80000);

INSERT INTO stocks (product_id, quantity) VALUES
(1, 20),(2, 30),(3, 10),(4, 15),(5, 25),
(6, 12),(7, 40),(8, 8),(9, 18),(10, 50);
