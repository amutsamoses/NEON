"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderStatus = exports.updateOrderStatus = exports.createOrderStatus = exports.getSingleOrderStatus = exports.listOrderStatuses = void 0;
const order_status_service_1 = require("./order_status.service");
const listOrderStatuses = async (c) => {
    try {
        const orderStatus = await (0, order_status_service_1.getOrderStatusService)();
        if (orderStatus == null || orderStatus.length == 0) {
            return c.text("No orderStatus found", 404);
        }
        return c.json(orderStatus, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.listOrderStatuses = listOrderStatuses;
const getSingleOrderStatus = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderStatus = await (0, order_status_service_1.getSingleOrderStatusService)(id);
        if (orderStatus == null) {
            return c.text("OrderStatus not found", 404);
        }
        return c.json(orderStatus, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getSingleOrderStatus = getSingleOrderStatus;
const createOrderStatus = async (c) => {
    try {
        const orderStatus = await c.req.json();
        const result = await (0, order_status_service_1.createOrderStatusService)(orderStatus);
        if (!result) {
            return c.text("OrderStatus not created", 400);
        }
        return c.json({ message: result }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createOrderStatus = createOrderStatus;
const updateOrderStatus = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderStatus = await c.req.json();
        const orderStatusExists = await (0, order_status_service_1.getSingleOrderStatusService)(id);
        if (!orderStatusExists) {
            return c.text("OrderStatus does not exist", 404);
        }
        // search for user by id
        const result = await (0, order_status_service_1.updateOrderStatusService)(id, orderStatus);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateOrderStatus = updateOrderStatus;
const deleteOrderStatus = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.text("Invalid id", 400);
    }
    try {
        const orderStatus = await (0, order_status_service_1.getSingleOrderStatusService)(id);
        if (!orderStatus) {
            return c.text("OrderStatus not found", 404);
        }
        const result = await (0, order_status_service_1.deleteOrderStatusService)(id);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteOrderStatus = deleteOrderStatus;
