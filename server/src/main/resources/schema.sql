CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    is_admin TINYINT(1) NOT NULL
);

CREATE TABLE IF NOT EXISTS product_category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    price DOUBLE NOT NULL,
    category_id BIGINT NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    CONSTRAINT fk_products_category 
      FOREIGN KEY (category_id) 
      REFERENCES product_category(id) 
      ON DELETE RESTRICT 
      ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS inventory (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    date_added DATE NOT NULL,
    date_updated DATE NOT NULL,
    product_id BIGINT NOT NULL UNIQUE,
    CONSTRAINT fk_inventory_product 
      FOREIGN KEY (product_id) 
      REFERENCES products(id) 
      ON DELETE CASCADE
);

