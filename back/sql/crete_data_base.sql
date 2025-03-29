-- Eliminar la base de datos si existe
DROP DATABASE IF EXISTS Ecomerce;

-- Crear la base de datos
CREATE DATABASE Ecomerce;

-- Usar la base de datos recién creada
USE Ecomerce;

-- Crear la tabla 'categories' para almacenar las categorías
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Crear la tabla 'Products' para los productos
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) CHECK (price > 0),
    description TEXT,
    image TEXT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insertar categorías en la tabla 'categories'
INSERT INTO categories (name)
VALUES 
('men''s clothing'),
('jewelery'),
('electronics'),
('women''s clothing'),
('all'); 

-- Insertar productos en la tabla 'Products' con la relación a la categoría
INSERT INTO Products (title, price, description, image, category_id) 
VALUES 
('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 109.95, 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday', 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', (SELECT id FROM categories WHERE name = 'men''s clothing')),
('Mens Casual Premium Slim Fit T-Shirts', 22.3, 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric...', 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', (SELECT id FROM categories WHERE name = 'men''s clothing')),
('Mens Cotton Jacket', 55.99, 'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions...', 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg', (SELECT id FROM categories WHERE name = 'men''s clothing')),
('Mens Casual Slim Fit', 15.99, 'The color could be slightly different between on the screen and in practice...', 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg', (SELECT id FROM categories WHERE name = 'men''s clothing')),
('John Hardy Women''s Legends Naga Gold & Silver Dragon Station Chain Bracelet', 695, 'From our Legends Collection, the Naga was inspired by the mythical water dragon...', 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg', (SELECT id FROM categories WHERE name = 'jewelery')),
('Solid Gold Petite Micropave', 168, 'Satisfaction Guaranteed. Return or exchange any order within 30 days...', 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg', (SELECT id FROM categories WHERE name = 'jewelery')),
('White Gold Plated Princess', 9.99, 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring...', 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg', (SELECT id FROM categories WHERE name = 'jewelery')),
('Pierced Owl Rose Gold Plated Stainless Steel Double', 10.99, 'Rose Gold Plated Double Flared Tunnel Plug Earrings...', 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg', (SELECT id FROM categories WHERE name = 'jewelery')),
('WD 2TB Elements Portable External Hard Drive - USB 3.0', 64, 'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance...', 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg', (SELECT id FROM categories WHERE name = 'electronics')),
('SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s', 109, 'Easy upgrade for faster boot up, shutdown, application load...', 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg', (SELECT id FROM categories WHERE name = 'electronics')),
('Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5', 109, '3D NAND flash are applied to deliver high transfer speeds...', 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg', (SELECT id FROM categories WHERE name = 'electronics')),
('WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive', 114, 'Expand your PS4 gaming experience, Play anywhere Fast and easy...', 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg', (SELECT id FROM categories WHERE name = 'electronics')),
('Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin', 599, '21.5 inches Full HD (1920 x 1080) widescreen IPS display...', 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg', (SELECT id FROM categories WHERE name = 'electronics')),
('Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA)', 999.99, '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR...', 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg', (SELECT id FROM categories WHERE name = 'electronics')),
('BIYLACLESEN Women''s 3-in-1 Snowboard Jacket Winter Coats', 56.99, 'Note:The Jackets is US standard size, Please choose size as your usual wear...', 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg', (SELECT id FROM categories WHERE name = 'women''s clothing')),
('Lock and Love Women''s Removable Hooded Faux Leather Moto Biker Jacket', 29.95, '100% POLYURETHANE(shell) 100% POLYESTER(lining)...', 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg', (SELECT id FROM categories WHERE name = 'women''s clothing')),
('Rain Jacket Women Windbreaker Striped Climbing Raincoats', 39.99, 'Lightweight perfet for trip or casual wear---Long sleeve with hooded...', 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg', (SELECT id FROM categories WHERE name = 'women''s clothing')),
('MBJ Women''s Solid Short Sleeve Boat Neck V', 9.85, '95% RAYON 5% SPANDEX, Made in USA or Imported...', 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg', (SELECT id FROM categories WHERE name = 'women''s clothing')),
('Opna Women''s Short Sleeve Moisture', 7.95, '100% Polyester, Machine wash, 100% cationic polyester interlock...', 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg', (SELECT id FROM categories WHERE name = 'women''s clothing')),
('DANVOUY Womens T Shirt Casual Cotton Short', 12.99, '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print...', 'https://fakestoreapi.com/img/61pBnvSoCOL._AC_UX679_.jpg', (SELECT id FROM categories WHERE name = 'women''s clothing'));

-- Tabla para los usuarios
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL
);

-- Tabla para las ciudades
CREATE TABLE cities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla para las calles
CREATE TABLE streets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Tabla para las direcciones
CREATE TABLE addresses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id CHAR(36) UNIQUE NOT NULL,
    city_id INT,
    street_id INT,
    number INT,
    zipcode VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES cities(id),
    FOREIGN KEY (street_id) REFERENCES streets(id)
);

-- Insertar ciudades
INSERT INTO cities (name)
VALUES 
('kilcoole');

-- Insertar calles
INSERT INTO streets (name)
VALUES 
('new road'),
('Lovers Ln');

-- Insertar usuarios con UUID
INSERT INTO users (id, email, username, password, firstname, lastname, phone) 
VALUES 
(UUID(), 'john@gmail.com', 'johnd', 'm38rmF$', 'john', 'doe', '1-570-236-7033'),
(UUID(), 'morrison@gmail.com', 'mor_2314', '83r5^_', 'david', 'morrison', '1-570-236-7033');

INSERT INTO addresses (user_id, city_id, street_id, number, zipcode) 
VALUES
((SELECT id FROM users WHERE email = 'john@gmail.com'), (SELECT id FROM cities WHERE name = 'kilcoole'), (SELECT id FROM streets WHERE name = 'new road'), 7682, '12926-3874'),
((SELECT id FROM users WHERE email = 'morrison@gmail.com'), (SELECT id FROM cities WHERE name = 'kilcoole'), (SELECT id FROM streets WHERE name = 'Lovers Ln'), 7267, '12926-3874');

-- Crear la tabla para los carritos
CREATE TABLE Carts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id CHAR(36) NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Crear la tabla para los productos del carrito
CREATE TABLE Cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insertar el primer carrito para el usuario 'john'
INSERT INTO carts (user_id)
VALUES ((SELECT id FROM users WHERE email = 'john@gmail.com'));

-- Insertar productos en el carrito de 'john'
INSERT INTO cart_items (cart_id, product_id, quantity)
VALUES 
((SELECT id FROM carts WHERE user_id = (SELECT id FROM users WHERE email = 'john@gmail.com')), (SELECT id FROM products WHERE title = 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'), 2),
((SELECT id FROM carts WHERE user_id = (SELECT id FROM users WHERE email = 'john@gmail.com')), (SELECT id FROM products WHERE title = 'Mens Casual Premium Slim Fit T-Shirts'), 3);
