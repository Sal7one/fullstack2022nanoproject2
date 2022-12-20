import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_PROD_DB,
  POSTGRES_USER,
  POSTGRES_PASS
} = process.env;

let client: Pool;

if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASS
  });
} else if (ENV === 'prod') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_PROD_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASS
  });
} else {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASS
  });
}

export default client;

// CREATE TABLE products (
//   id SERIAL PRIMARY KEY,
//   name TEXT NOT NULL,
//   price INTEGER NOT NULL
// );

// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   firstname TEXT NOT NULL,
//   lastname TEXT NOT NULL,
//   password TEXT NOT NULL
// );

// CREATE TABLE orders (
//   id SERIAL PRIMARY KEY,
//   name TEXT NOT NULL,
//   product_id BIGINT NOT NULL,
//   user_id BIGINT NOT NULL,
//   quantity INTEGER NOT NULL,
//   order_status TEXT NOT NULL,
//   FOREIGN KEY (product_id) REFERENCES products(id),
//   FOREIGN KEY (user_id) REFERENCES users(id)
// );

// CREATE TABLE order_products (
//     id SERIAL PRIMARY KEY,
//     quantity integer,
//     order_id bigint REFERENCES orders(id),
//     product_id bigint REFERENCES products(id)
// );
