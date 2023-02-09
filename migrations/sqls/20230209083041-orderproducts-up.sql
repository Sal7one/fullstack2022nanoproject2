CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  product_quantity INT NOT NULL,
  product_id integer REFERENCES products(id) 
  ON DELETE NO ACTION,
  order_id integer REFERENCES orders(id) 
  ON DELETE NO ACTION
);