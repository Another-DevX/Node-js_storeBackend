# Express.js Backend Project

## Overview

This is a simple CRUD (Create, Read, Update, Delete) backend project built using Express.js. It demonstrates the use of middleware, CORS authentication, and data validation.

## Features

- **CRUD Operations**: Basic Create, Read, Update, Delete operations for a resource.
- **Middleware**: Custom middleware to handle requests and responses.
- **CORS Authentication**: CORS (Cross-Origin Resource Sharing) based authentication.
- **Validation**: Input validation using libraries like `Joi` and error handling using `Boom`.

## Prerequisites

- Node.js
- npm

## Getting Started

1. Clone the repository
```git clone https://github.com/Another-DevX/Node-js_storeBackend```

2. Navigate to the project folder
```cd expressjs-backend```

3. Install dependencies
```npm install```

4. Start the server
```npm start```



## Usage

### API Endpoints

- **GET /products**: Fetch all resources.
- **GET /products/:id**: Fetch a single resource by ID.
- **POST /products**: Create a new resource. Requires CORS authentication.
- **PATCH /products/:id**: Update a resource by ID. Requires CORS authentication and validation.
- **DELETE /products/:id**: Delete a resource by ID. Requires CORS authentication.

### Middleware

Custom middleware can be added in the `middlewares` folder.

### CORS Authentication

To authenticate, the client must handle CORS by setting appropriate headers and the server validates it.
