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
        <title>Restaurant Management System</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #333;
          }
          .container {
            text-align: center;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            max-width: 400px;
            width: 90%;
          }
          h1 {
            color: #343a40;
            margin-bottom: 10px;
          }
          p {
            font-size: 1.1em;
            margin-bottom: 20px;
          }
          .footer {
            font-size: 0.9em;
            color: #6c757d;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to Kephar's Eatery 🍽️</h1>
          <p>
            Hello! I'm Kephar Moses, and this is my restaurant API. Discover the
            finest cuisines, explore our menu, and make reservations
            effortlessly. 🍕🍔🍜
          </p>
          <div class="footer">&copy; 2024 Kephar Moses</div>
        </div>
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
