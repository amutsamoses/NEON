"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantOwnerService = exports.updateRestaurantOwnerService = exports.createRestaurantOwnerService = exports.getSingleRestaurantOwnerService = exports.getRestaurantOwnerService = void 0;
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
// GET ALL RESTAURANT OWNERS
const getRestaurantOwnerService = async () => {
    const restaurantOwner = await db_1.default.query.RestaurantOwner.findMany();
    return restaurantOwner;
};
exports.getRestaurantOwnerService = getRestaurantOwnerService;
// GET SINGLE RESTAURANT OWNER
const getSingleRestaurantOwnerService = async (id) => {
    const restaurantOwner = await db_1.default.query.RestaurantOwner.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.RestaurantOwner.id, id),
    });
    return restaurantOwner;
};
exports.getSingleRestaurantOwnerService = getSingleRestaurantOwnerService;
// CREATE RESTAURANT OWNER
const createRestaurantOwnerService = async (restaurantOwner) => {
    await db_1.default.insert(schema_1.RestaurantOwner).values(restaurantOwner);
    return "Restaurant Owner created successfully";
};
exports.createRestaurantOwnerService = createRestaurantOwnerService;
//  UPDATE RESTAURANT OWNER
const updateRestaurantOwnerService = async (id, restaurantOwner) => {
    await db_1.default.update(schema_1.RestaurantOwner).set(restaurantOwner).where((0, drizzle_orm_1.eq)(schema_1.RestaurantOwner.id, id));
    return "Restaurant Owner updated successfully";
};
exports.updateRestaurantOwnerService = updateRestaurantOwnerService;
// DELETE RESTAURANT OWNER
const deleteRestaurantOwnerService = async (id) => {
    await db_1.default.delete(schema_1.RestaurantOwner).where((0, drizzle_orm_1.eq)(schema_1.RestaurantOwner.id, id));
    return "Restaurant Owner deleted successfully";
};
exports.deleteRestaurantOwnerService = deleteRestaurantOwnerService;
