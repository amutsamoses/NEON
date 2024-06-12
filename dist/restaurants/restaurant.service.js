"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantService = exports.updateRestaurantService = exports.createRestaurantService = exports.getSingleRestaurantService = exports.getRestaurantService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getRestaurantService = async () => {
    return await db_1.default.query.Restaurant.findMany();
};
exports.getRestaurantService = getRestaurantService;
//get single restaurant
const getSingleRestaurantService = async (id) => {
    return await db_1.default.query.Restaurant.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Restaurant.id, id),
    });
};
exports.getSingleRestaurantService = getSingleRestaurantService;
const createRestaurantService = async (restaurant) => {
    await db_1.default.insert(schema_1.Restaurant).values(restaurant);
    return restaurant;
};
exports.createRestaurantService = createRestaurantService;
const updateRestaurantService = async (id, restaurant) => {
    await db_1.default.update(schema_1.Restaurant).set(restaurant).where((0, drizzle_orm_1.eq)(schema_1.Restaurant.id, id));
    return restaurant;
};
exports.updateRestaurantService = updateRestaurantService;
const deleteRestaurantService = async (id) => {
    await db_1.default.delete(schema_1.Restaurant).where((0, drizzle_orm_1.eq)(schema_1.Restaurant.id, id));
    return "Restaurant deleted successfully";
};
exports.deleteRestaurantService = deleteRestaurantService;
