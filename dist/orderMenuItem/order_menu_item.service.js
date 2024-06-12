"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderMenuItemService = exports.updateOrderMenuItemService = exports.createOrderMenuItemService = exports.getSingleOrderMenuItemService = exports.getOrderMenuItemService = void 0;
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
// GET ALL ORDER MENU ITEM
const getOrderMenuItemService = async () => {
    const orderMenuItem = await db_1.default.query.OrderMenuItem.findMany();
    return orderMenuItem;
};
exports.getOrderMenuItemService = getOrderMenuItemService;
// GET SINGLE ORDER MENU ITEM
const getSingleOrderMenuItemService = async (id) => {
    const orderMenuItem = await db_1.default.query.OrderMenuItem.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.OrderMenuItem.id, id),
    });
    return orderMenuItem;
};
exports.getSingleOrderMenuItemService = getSingleOrderMenuItemService;
// CREATE ORDER MENU ITEM
const createOrderMenuItemService = async (orderMenuItem) => {
    await db_1.default.insert(schema_1.OrderMenuItem).values(orderMenuItem);
    return "Order Menu Item created successfully";
};
exports.createOrderMenuItemService = createOrderMenuItemService;
//  UPDATE ORDER MENU ITEM
const updateOrderMenuItemService = async (id, orderMenuItem) => {
    await db_1.default
        .update(schema_1.OrderMenuItem)
        .set(orderMenuItem)
        .where((0, drizzle_orm_1.eq)(schema_1.OrderMenuItem.id, id));
    return "Order Menu Item updated successfully";
};
exports.updateOrderMenuItemService = updateOrderMenuItemService;
// DELETE ORDER MENU ITEM
const deleteOrderMenuItemService = async (id) => {
    await db_1.default.delete(schema_1.OrderMenuItem).where((0, drizzle_orm_1.eq)(schema_1.OrderMenuItem.id, id));
    return "Order Menu Item deleted successfully";
};
exports.deleteOrderMenuItemService = deleteOrderMenuItemService;
