"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantOwnerRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const restraurant_owner_controller_1 = require("./restraurant_owner.controller");
exports.restaurantOwnerRouter = new hono_1.Hono();
//get all restaurantOwners
exports.restaurantOwnerRouter.get("/restaurantOwners", restraurant_owner_controller_1.listRestaurantOwners);
exports.restaurantOwnerRouter.get("/restaurantOwners/:id", restraurant_owner_controller_1.getSingleRestaurantOwner);
exports.restaurantOwnerRouter.post("/restaurantOwners", (0, zod_validator_1.zValidator)("json", validators_1.restaurantOwnerSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), restraurant_owner_controller_1.createRestaurantOwner);
exports.restaurantOwnerRouter.put("/restaurantOwners/:id", (0, zod_validator_1.zValidator)("json", validators_1.restaurantOwnerSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), restraurant_owner_controller_1.updateRestaurantOwner);
exports.restaurantOwnerRouter.delete("/restaurantOwners/:id", restraurant_owner_controller_1.deleteRestaurantOwner);
