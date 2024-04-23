# E-Hub 

## Authors: Michelle Amina Okumu , Meyer Akok, Mujahid Abdi, Victor Muturi, Valerie Nandabi 

### Introduction
E-hUB is a group project made as part of Phase4 Week 3 Independent Project. It's a fullstack e-commerce and admin dashboard web application built with react and Flask .

E-Hub is an innovative e-commerce application designed to cater to all your electronics needs. With its comprehensive platform, E-Hub offers both clients and administrators a seamless shopping and management experience.



### Project Requirements
1. Use a Flask API backend with a React frontend.
2. Have at least three models on the backend, that include the following:
3. At least two one-to-many relationships.
4. At least one reciprocal many-to-many relationship.
5. The many-to-many association model/table must have a user submittable attribute, i.e. an attribute aside from the foreign keys.
6. Full CRUD actions for at least one resource.
7. Minimum of create and read actions for EACH resource.
8. Use forms and validation through Formik on all input.
9. At least one data type validation.
10. At least one string/number format validation.
11. Have at least three different client-side routes using React Router. Be sure to include a nav bar or other UI element that allows users to navigate between routes.
12. Connect the client and server using fetch().


### Folders and Files
#### Client/src = Contains all the react code 
1. client/src/admin 
    - sidebar.jsx - Sidebar with routing to different pages; admin home page, products page, orders page and logout 
    - adminHome.jsx- Contains the admin dashboard home page with tables and charts created with Material Ui and Apex charts. 
    - adminOrders.jsx - Table with list of orders placed by clients fetched from the databse. Default status is pending until changed by the admin 
    - adminProducts.jsx - Table containing all available products fetched from the products table, as well as a form for adding new products to the databse.
2. client/src/client
    - navbar.jsx -  Navigation bar with routes to different pages i.e products, cart, orders, logout
    - client.jsx - Home page for client side e-commerce pages. 
    - clientProducts.jsx - List of all available products fetched from the database (products table). Different sorting and filtering functions implemented. Buttons to add a product to cart 
    - clientOrders.jsx -  Page that fetches orders previously placed by the client and displays them.
    - clientCart.jsx -  All products added to cart end up here. Context is used to add and maintain the state of the products in the cart. Cart items can be increased, decreased or removed. This also adjusts the total price. Upon checking out, the order is posted to the database in both the orders table and orderItems table. 
3. App.jsx - Contains all routes and nested routes for the whole application 

#### Server - Contains all the flask/python code for the backend 
1. Models.py - Contains 4 models for the database (app.db). 
    - User stores the user information upon registration which is then fetched when logging in i.e checking if a user is logged in as an admin or client 
    - Products ; stores all information concerning the products available. This data is fetched and presented to the client and/or admin in their respective products page. An admin can also add a new product which is then stored in this table 
    - Order ;  contains all information concerning all orders made by a user
    - OrderItem ; stores individual items from each order made by a user. A user can have multiple orders and each order can contain multiple products/items 
2. App.py - Contains all routes, validations and authorizations 
    - UserLogin - route to log in users and administer access tokens 
    - UserRegister - route to POST/register users and save their information to the User table in the databse 
    - Logout - route to logout and delete access tokens 
    - Orders - route to GET all orders
    - Products - route to GET products in the client side 
    - AdminProducts - route to GET all products from the admin dashboard and POST new products 
    - AdminOrders - route to GET all orders from the admin dashboard 
    - AdminOrdersById - route to DELETE and PATCH/ update an order 
3. Seed.py - Contains fake data for seeding the intial products table 

### To run the program/ setup instructions
1. Clone the repository and naviate to the project directory.
2. Install the required dependencies in their individual directories 
    - cd server, pipenv install && pipenv shell
    - cd client,  npm install 
3. Start the server 
    - cd server , python3 app.py 
    - cd client, npm run dev
4. Visit the provided route 
    - http://localhost:5173/
    - http://127.0.0.1:5555

5. Once the project is running, either register a new account (either client or admin) or use on of the preset accounts
     user1@gmail.com (password = password)
     admin1@gmail.com (password = password)

6. Feel free to navigate through either or both sides of the application and use it just as one would use other e-commerce sites