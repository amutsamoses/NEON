"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurant = exports.updateRestaurant = exports.createRestaurant = exports.getSingleRestaurant = exports.listRestaurants = void 0;
const restaurant_service_1 = require("./restaurant.service");
const listRestaurants = async (c) => {
    const data = await (0, restaurant_service_1.getRestaurantService)();
    if (data == null) {
        return c.text("No data found", 404);
    }
    return c.json(data, 200);
};
exports.listRestaurants = listRestaurants;
const getSingleRestaurant = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.text("Invalid ID", 400);
    }
    const restaurant = await (0, restaurant_service_1.getSingleRestaurantService)(id);
    if (restaurant == undefined) {
        return c.text("No data found", 404);
    }
    return c.json(restaurant, 200);
};
exports.getSingleRestaurant = getSingleRestaurant;
const createRestaurant = async (c) => {
    try {
        const restaurant = await c.req.json();
        const createRestaurant = await (0, restaurant_service_1.createRestaurantService)(restaurant);
        if (!createRestaurant) {
            return c.text("Restaurant not created", 400);
        }
        return c.json({ msg: createRestaurant }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createRestaurant = createRestaurant;
const updateRestaurant = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.text("invalid ID!", 400);
    }
    const user = await c.req.json();
    try {
        //search for user
        const foundRestaurant = await (0, restaurant_service_1.getSingleRestaurantService)(id);
        if (foundRestaurant == undefined)
            return c.text("user not found!👽", 404);
        //get the data and update
        const res = await (0, restaurant_service_1.updateRestaurantService)(id, user);
        //return the updated user
        if (!res)
            return c.text("user not updated!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateRestaurant = updateRestaurant;
//delete user
const deleteRestaurant = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    try {
        //search for the user
        const restaurant = await (0, restaurant_service_1.getSingleRestaurantService)(id);
        if (restaurant == undefined)
            return c.text("user not found!👽", 404);
        //delete the user
        const res = await (0, restaurant_service_1.deleteRestaurantService)(id);
        if (!res)
            return c.text("user not deleted!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteRestaurant = deleteRestaurant;
