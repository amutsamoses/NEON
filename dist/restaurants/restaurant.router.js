"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const restaurant_controller_1 = require("./restaurant.controller");
const validators_1 = require("../validators");
exports.restaurantRouter = new hono_1.Hono();
//get all restaurants
exports.restaurantRouter.get("/restaurants", restaurant_controller_1.listRestaurants);
exports.restaurantRouter.get("/restaurants/:id", restaurant_controller_1.getSingleRestaurant);
exports.restaurantRouter.post("/restaurants", (0, zod_validator_1.zValidator)("json", validators_1.restaurantSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), restaurant_controller_1.createRestaurant);
exports.restaurantRouter.put("/restaurants/:id", restaurant_controller_1.updateRestaurant);
exports.restaurantRouter.delete("/restaurants/:id", restaurant_controller_1.deleteRestaurant);
