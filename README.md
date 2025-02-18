
# Backend Project with Express and Socket.IO


This project is a backend server built with Node.js, Express, Handlebars, 
and Socket.IO. It allows managing products and shopping carts via a RESTful API and provides a real-time interface to display products and manage their addition/deletion.


## Technologies

Node.js: JavaScript runtime environment for server-side code.

Express: Node.js framework for building web applications and APIs.

Handlebars: Templating engine to render views.

Socket.IO: Library for real-time communication between the client and the server.

RESTful API: For managing products and shopping carts.

## Features

Real-time product listing with Socket.IO.
RESTful API for adding, deleting, and retrieving products.
Dynamic views rendered with Handlebars.
Support for shopping carts.
## Installation

To run this project locally, follow these steps:

Clone this repository:

bash

git clone https://github.com/CristelFrowein/proyectoBackend.git

Navigate to the project directory:

bash

cd proyectoBackend

Install the dependencies:

bash

npm install

Run the server:

bash

npm start

The server should be running at http://localhost:8080.


## API Endpoints


## Products (/api/products)

GET /api/products: Retrieve all products.
POST /api/products: Add a new product.
DELETE /api/products/:id: Delete a product by its ID.




## Carts (/api/carts)

GET /api/carts: Retrieve all carts.
POST /api/carts: Create a new cart.
POST /api/carts/:cid/products: Add a product to the specified cart.



## Views

The server exposes two views rendered with Handlebars:

/ (Home): Displays the initial list of products.
/realtimeproducts: Displays the real-time product list using Socket.IO.



## Socket.IO - Real-Time Communication

This project uses Socket.IO to send real-time updates of the product list to all connected clients. The following actions are available:

addProduct: Adds a new product and updates the product list in real-time.
deleteProduct: Deletes a product and updates the product list in real-time.


## Socket.IO Communication


Emitted events:
productList: Sends the updated product list to all connected clients.
Listened events:
addProduct: To add a new product.
deleteProduct: To delete a product.


## Important Files

server.js: Main file where the server and API routes are set up.

public/: Folder containing static files (CSS, JS, images).

views/: Folder containing views rendered with Handlebars.


## Postman Collection


You can import the Postman collection from the file postman/proyectoBackend.postman_collection.json to test the API routes.

