"use strict";
// import { serve } from '@hono/node-server'
// import { Hono } from 'hono'
Object.defineProperty(exports, "__esModule", { value: true });
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
const hono_1 = require("hono");
require("dotenv/config");
const node_server_1 = require("@hono/node-server");
const http_exception_1 = require("hono/http-exception");
const logger_1 = require("hono/logger");
const csrf_1 = require("hono/csrf");
const trailing_slash_1 = require("hono/trailing-slash");
//Routes imports
const user_router_1 = require("./users/user.router");
const city_router_1 = require("./city/city.router");
const restaurant_router_1 = require("./restaurants/restaurant.router");
const state_router_1 = require("./state/state.router");
const driver_router_1 = require("./drivers/driver.router");
const address_router_1 = require("./address/address.router");
const order_router_1 = require("./orders/order.router");
const comment_router_1 = require("./comment/comment.router");
const category_router_1 = require("./category/category.router");
const menuitem_router_1 = require("./menuItem/menuitem.router");
const restraunant_owner_router_1 = require("./restaurant_owner/restraunant_owner.router");
const order_status_router_1 = require("./order_status/order_status.router");
const status_catalog_router_1 = require("./status_catalog/status_catalog.router");
const order_menu_item_router_1 = require("./orderMenuItem/order_menu_item.router");
// authentication
const auth_router_1 = require("./auth/auth.router");
//initialize hono
const app = new hono_1.Hono().basePath("/api");
// in built middlewares
const custonTimeoutException = () => new http_exception_1.HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
});
app.use((0, logger_1.logger)()); // logs request and response to the console
app.use((0, csrf_1.csrf)()); // adds csrf token to the response header preventing csrf attacks
//default route
app.use((0, trailing_slash_1.trimTrailingSlash)()); // removes trailing slashes from the url
app.get("ok", (c) => {
    return c.text("The server is running😀");
});
app.get("/timeout", async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 11000));
    return c.text("data after 5 seconds", 200);
});
//custom routes
app.route("/", restaurant_router_1.restaurantRouter);
app.route("/", user_router_1.userRouter);
app.route("/", city_router_1.cityRouter);
app.route("/", restaurant_router_1.restaurantRouter);
app.route("/", state_router_1.stateRouter);
app.route("/", driver_router_1.driverRouter);
app.route("/", address_router_1.addressRouter);
app.route("/", order_router_1.orderRouter);
app.route("/", comment_router_1.commentRouter);
app.route("/", category_router_1.categoryRouter);
app.route("/", menuitem_router_1.menuItemRouter);
app.route("/", restraunant_owner_router_1.restaurantOwnerRouter);
app.route("/", order_status_router_1.orderStatusRouter);
app.route("/", status_catalog_router_1.statusCatalogRouter);
app.route("/", order_menu_item_router_1.orderMenuItemRouter);
//authentication
app.route("auth/", auth_router_1.authRouter);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT),
});
console.log(`Server is running on port ${process.env.PORT}`);
