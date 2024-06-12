"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantOwner = exports.updateRestaurantOwner = exports.createRestaurantOwner = exports.getSingleRestaurantOwner = exports.listRestaurantOwners = void 0;
const restraurant_owner_service_1 = require("./restraurant_owner.service");
const listRestaurantOwners = async (c) => {
    try {
        const restaurantOwner = await (0, restraurant_owner_service_1.getRestaurantOwnerService)();
        if (restaurantOwner == null || restaurantOwner.length == 0) {
            return c.text("No restaurantOwner found", 404);
        }
        return c.json(restaurantOwner, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.listRestaurantOwners = listRestaurantOwners;
const getSingleRestaurantOwner = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const restaurantOwner = await (0, restraurant_owner_service_1.getSingleRestaurantOwnerService)(id);
        if (restaurantOwner == null) {
            return c.text("Restaurant Owner not found", 404);
        }
        return c.json(restaurantOwner, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getSingleRestaurantOwner = getSingleRestaurantOwner;
const createRestaurantOwner = async (c) => {
    try {
        const restaurantOwner = await c.req.json();
        const result = await (0, restraurant_owner_service_1.createRestaurantOwnerService)(restaurantOwner);
        if (!result) {
            return c.text("Restaurant Owner not created", 400);
        }
        return c.json({ message: result }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createRestaurantOwner = createRestaurantOwner;
const updateRestaurantOwner = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const restaurant_owner = await c.req.json();
        // search for user by id
        const restaurantOwnerExists = await (0, restraurant_owner_service_1.getSingleRestaurantOwnerService)(id);
        if (!restaurantOwnerExists == null) {
            return c.text("Restaurant Owner not found", 404);
        }
        // get data to update
        const result = await (0, restraurant_owner_service_1.updateRestaurantOwnerService)(id, restaurant_owner);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateRestaurantOwner = updateRestaurantOwner;
const deleteRestaurantOwner = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.text("Invalid id", 400);
    }
    try {
        const restaurant_owner = await (0, restraurant_owner_service_1.deleteRestaurantOwnerService)(id);
        if (!restaurant_owner) {
            return c.text("Restaurant Owner not found", 404);
        }
        const result = await (0, restraurant_owner_service_1.deleteRestaurantOwnerService)(id);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteRestaurantOwner = deleteRestaurantOwner;
