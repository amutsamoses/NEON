"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderStatusService = exports.updateOrderStatusService = exports.createOrderStatusService = exports.getSingleOrderStatusService = exports.getOrderStatusService = void 0;
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
// GET ALL ORDER_STATUSS
const getOrderStatusService = async () => {
    const orderStatus = await db_1.default.query.OrderStatus.findMany();
    return orderStatus;
};
exports.getOrderStatusService = getOrderStatusService;
// GET SINGLE ORDER_STATUS
const getSingleOrderStatusService = async (id) => {
    const orderStatus = await db_1.default.query.OrderStatus.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.OrderStatus.id, id),
    });
    return orderStatus;
};
exports.getSingleOrderStatusService = getSingleOrderStatusService;
// CREATE ORDER_STATUS
const createOrderStatusService = async (orderStatus) => {
    await db_1.default.insert(schema_1.OrderStatus).values(orderStatus);
    return "OrderStatus created successfully";
};
exports.createOrderStatusService = createOrderStatusService;
//  UPDATE ORDER_STATUS
const updateOrderStatusService = async (id, orderStatus) => {
    await db_1.default.update(schema_1.OrderStatus).set(orderStatus).where((0, drizzle_orm_1.eq)(schema_1.OrderStatus.id, id));
    return "OrderStatus updated successfully";
};
exports.updateOrderStatusService = updateOrderStatusService;
// DELETE ORDER_STATUS
const deleteOrderStatusService = async (id) => {
    await db_1.default.delete(schema_1.OrderStatus).where((0, drizzle_orm_1.eq)(schema_1.OrderStatus.id, id));
    return "OrderStatus deleted successfully";
};
exports.deleteOrderStatusService = deleteOrderStatusService;
