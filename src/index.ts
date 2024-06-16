// import { serve } from '@hono/node-server'
// import { Hono } from 'hono'

// const app = new Hono()

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })

// const port = 3000
// console.log(`Server is running on port ${port}`)

// serve({
//   fetch: app.fetch,
//   port
// })

import { Hono } from "hono";
import "dotenv/config";
import { serve } from "@hono/node-server";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { csrf } from "hono/csrf";
import { html, raw } from "hono/html";
import { trimTrailingSlash } from "hono/trailing-slash";

//Routes imports
import { userRouter } from "./users/user.router";
import { cityRouter } from "./city/city.router";
import { restaurantRouter } from "./restaurants/restaurant.router";
import { stateRouter } from "./state/state.router";
import { driverRouter } from "./drivers/driver.router";
import { addressRouter } from "./address/address.router";
import { orderRouter } from "./orders/order.router";
import { commentRouter } from "./comment/comment.router";
import { categoryRouter } from "./category/category.router";
import { menuItemRouter } from "./menuItem/menuitem.router";
import { restaurantOwnerRouter } from "./restaurant_owner/restraunant_owner.router";
import { orderStatusRouter } from "./order_status/order_status.router";
import { statusCatalogRouter } from "./status_catalog/status_catalog.router";
import { orderMenuItemRouter } from "./orderMenuItem/order_menu_item.router";

// authentication
import { authRouter } from "./auth/auth.router";

//initialize hono
const app = new Hono().basePath("/api");

// in built middlewares

const custonTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  });

app.use(logger()); // logs request and response to the console
app.use(csrf()); // adds csrf token to the response header preventing csrf attacks
//default route
app.use(trimTrailingSlash()); // removes trailing slashes from the url

app.get("/ok", (c) => {
  return c.html(
    html`
      <head>
        <title>Kephar Moses' Restaurant</title>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: url("/mnt/data/final.png") no-repeat center center fixed;
            background-size: cover;
            color: #4f4b4b;
            display: flex;
            flex-direction: column;
            height: 100vh;
          }
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 60px 40px;
            background: rgba(0, 0, 0, 0.7);
          }
          .navbar a {
            color: #fff;
            text-decoration: none;
            margin: 0 15px;
            font-size: 16px;
          }
          .navbar a:hover {
            text-decoration: underline;
            color: #26d042;
            transition: 0.2s;
          }
          .content {
            text-align: center;
            margin: auto;
            padding: 20px;
          }
          .content h1 {
            font-size: 48px;
            margin-bottom: 20px;
            color: rgba(0, 0, 0, 0.9);
          }
          .content p {
            font-size: 24px;
            margin-bottom: 40px;
            color: rgba(0, 0, 0, 0.9);
          }
          .content .view-menu-btn {
            position: absolute;
            background-color: #0a0a23;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 10px;
            font-size: 18px;
          }
          .content .view-menu-btn:hover {
            background-color: #002ead;
            transition: 0.2s;
          }
          .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 250px;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            padding: 20px;
            box-sizing: border-box;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
          }
          .sidebar.active {
            transform: translateX(0);
          }
          .sidebar h2 {
            color: #fff;
            margin-bottom: 20px;
          }
          .sidebar ul {
            list-style: none;
            padding: 0;
          }
          .sidebar ul li {
            margin-bottom: 15px;
          }
          .sidebar ul li a {
            color: #fff;
            text-decoration: none;
            font-size: 18px;
          }
          .sidebar ul li a:hover {
            text-decoration: underline;
            color: #0d930b;
            transition: 0.2s;
          }
          .menu-btn {
            position: fixed;
            left: 20px;
            top: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            font-size: 16px;
            z-index: 1000;
          }
          .menu-btn img {
            height: 20px;
            width: 20px;
          }
          .logo img {
            height: 50px;
          }
          .footer {
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            text-align: center;
            padding: 10px 0;
            position: absolute;
            bottom: 0;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <button class="menu-btn" onclick="toggleSidebar()">
          <img
            src="https://img.icons8.com/material-outlined/24/ffffff/menu--v1.png"
            alt="Menu Icon"
          />
        </button>
        <div class="navbar">
          <div class="logo">
            <img
              src="https://img.icons8.com/fluent/48/000000/restaurant.png"
              alt="Restaurant Logo"
            />
          </div>
          <div class="nav-links">
            <a href="#home">Home</a>
            <a href="#orders">Orders</a>
            <a href="#menu">Menu</a>
            <a href="#contact">Contact</a>
            <a href="#about">About Us</a>
          </div>
        </div>
        <div class="content">
          <h1>Welcome to Kephar's Eatery 🍽️</h1>
          <p>
            Discover the finest cuisines, explore our menu, and make
            reservations effortlessly. 🍕🍔🍜
          </p>
          <a href="#menu" class="view-menu-btn">View Menu</a>
        </div>
        <div class="sidebar" id="sidebar">
          <ul>
            <li><a href="#account">Account</a></li>
            <li><a href="#settings">Settings</a></li>
            <li><a href="#address">Address</a></li>
            <li><a href="#comments">Comments</a></li>
            <li><a href="#location">Location</a></li>
            <li><a href="#order_status">Order Status</a></li>
            <li><a href="#category">Category</a></li>
            <li><a href="#city">City</a></li>
            <li><a href="#driver">Driver</a></li>
            <li><a href="#restaurant_owner">Restaurant Owner</a></li>
            <li><a href="#status_catalog">Status Catalog</a></li>
            <li><a href="#state">State</a></li>
          </ul>
        </div>
        <div class="footer">&copy; 2024 Kephar Moses</div>
        <script>
          function toggleSidebar() {
            const sidebar = document.getElementById("sidebar");
            sidebar.classList.toggle("active");
          }
        </script>
      </body>
    `
  );
});

app.get("/timeout", async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 11000));
  return c.text("data after 5 seconds", 200);
});

//custom routes
app.route("/", restaurantRouter);
app.route("/", userRouter);
app.route("/", cityRouter);
app.route("/", restaurantRouter);
app.route("/", stateRouter);
app.route("/", driverRouter);
app.route("/", addressRouter);
app.route("/", orderRouter);
app.route("/", commentRouter);
app.route("/", categoryRouter);
app.route("/", menuItemRouter);
app.route("/", restaurantOwnerRouter);
app.route("/", orderStatusRouter);
app.route("/", statusCatalogRouter);
app.route("/", orderMenuItemRouter);

//authentication
app.route("auth/", authRouter);

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT),
});
console.log(`Server is running on port ${process.env.PORT}`);
