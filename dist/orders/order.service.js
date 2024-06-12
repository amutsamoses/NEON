"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderService = exports.updateOrderService = exports.createOrderService = exports.getSingleOrderService = exports.getOrderService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getOrderService = async () => {
    return await db_1.default.query.Orders.findMany();
};
exports.getOrderService = getOrderService;
//get single restaurant
const getSingleOrderService = async (id) => {
    return await db_1.default.query.Orders.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Orders.id, id),
    });
};
exports.getSingleOrderService = getSingleOrderService;
const createOrderService = async (orders) => {
    await db_1.default.insert(schema_1.Orders).values(orders);
    return orders;
};
exports.createOrderService = createOrderService;
const updateOrderService = async (id, orders) => {
    await db_1.default.update(schema_1.Orders).set(orders).where((0, drizzle_orm_1.eq)(schema_1.Orders.id, id));
    return orders;
};
exports.updateOrderService = updateOrderService;
const deleteOrderService = async (id) => {
    await db_1.default.delete(schema_1.Orders).where((0, drizzle_orm_1.eq)(schema_1.Orders.id, id));
    return "Order deleted successfully";
};
exports.deleteOrderService = deleteOrderService;
