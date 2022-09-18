# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## Database schema

| Table        | Attributes        | Types                           |
| ------------ | ----------------- | ------------------------------- |
| customers    | id                | SERIAL PRIMARY KEY              |
|              | first_name        | VARCHAR(50)                     |
|              | last_name         | VARCHAR(50)                     |
|              | customer_password | VARCHAR(500)                    |
|              |                   |                                 |
| products     | id                | SERIAL PRIMARY KEY              |
|              | product_name      | VARCHAR(100)                    |
|              | price             | INTEGER                         |
|              |                   |                                 |
| orders       | id                | SERIAL PRIMARY KEY              |
|              | customer_id       | INTEGER REFERENCES customer(id) |
|              | order_status      | VARCHAR(50)                     |
|              |                   |                                 |
| orders_infos | id                | SERIAL PRIMARY KEY              |
|              | order_id          | INTEGER REFERENCES orders(id)   |
|              | products_id       | INTEGER REFERENCES product(id)  |
|              | quantity          | INTEGER                         |

## Endpoints

|           | API Endpoints                                                                                |
| --------- | -------------------------------------------------------------------------------------------- |
| customers | Index [token required] -> get('/customers')                                                  |
|           | show [token required] -> get('/customers/:id')                                               |
|           | Create [Returns Token] -> post('/customers')                                                 |
|           | authenticate [Returns token] -> post('/customers/authenticate')                              |
|           | delete [token required] -> delete('/customers/:id')                                          |
|           | update [token required] -> put('/customers/:id')                                             |
|           |                                                                                              |
| products  | Index -> get('/products')                                                                    |
|           | Show -> get('/products/:id')                                                                 |
|           | Create [token required] -> post('/products')                                                 |
|           |                                                                                              |
|           | Create order ->post('/orders')                                                               |
|           | Create customer order ->post('/orders/create-product')                                       |
| orders    | Current Order by user (args: user id)[token required] -> get('/customer-order/:customer_id') |
