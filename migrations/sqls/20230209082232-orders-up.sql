CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
status VARCHAR(100) NULL,
user_id integer REFERENCES users(id) 
  ON DELETE NO ACTION
);
