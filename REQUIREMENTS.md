# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

```
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price BIGINT NOT NULL
);
```

#### User
- id
- firstName
- lastName
- password_digest

```
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 firstname VARCHAR(100) NOT NULL,
 lastname VARCHAR(100) NOT NULL,
 password_digest VARCHAR(100) NOT NULL
 );
```

#### Orders
- id
- user_id
- status of order (active or complete)

```
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
status VARCHAR(100) NULL,
user_id integer REFERENCES users(id) 
  ON DELETE NO ACTION
);

```
#### Order products
- id
- product_quantity
- product_id
- order_id

```
CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  product_quantity INT NOT NULL,
  product_id integer REFERENCES products(id) 
  ON DELETE NO ACTION,
  order_id integer REFERENCES orders(id) 
  ON DELETE NO ACTION
);
```