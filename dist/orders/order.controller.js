"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getSingleOrder = exports.listOrders = void 0;
const order_service_1 = require("./order.service");
const listOrders = async (c) => {
    const data = await (0, order_service_1.getOrderService)();
    if (data == null) {
        return c.text("No data found", 404);
    }
    return c.json(data, 200);
};
exports.listOrders = listOrders;
const getSingleOrder = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.text("Invalid ID", 400);
    }
    const order = await (0, order_service_1.getSingleOrderService)(id);
    if (order == undefined) {
        return c.text("No data found", 404);
    }
    return c.json(order, 200);
};
exports.getSingleOrder = getSingleOrder;
const createOrder = async (c) => {
    try {
        const order = await c.req.json();
        const createOrder = await (0, order_service_1.createOrderService)(order);
        if (!createOrder) {
            return c.text("Order not created", 400);
        }
        return c.json({ msg: createOrder }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOrder = createOrder;
const updateOrder = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.text("invalid ID!", 400);
    }
    const user = await c.req.json();
    try {
        //search for user
        const foundOrder = await (0, order_service_1.getSingleOrderService)(id);
        if (foundOrder == undefined)
            return c.text("user not found!👽", 404);
        //get the data and update
        const res = await (0, order_service_1.updateOrderService)(id, user);
        //return the updated user
        if (!res)
            return c.text("user not updated!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOrder = updateOrder;
//delete user
const deleteOrder = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    try {
        //search for the user
        const order = await (0, order_service_1.getSingleOrderService)(id);
        if (order == undefined)
            return c.text("user not found!👽", 404);
        //delete the user
        const res = await (0, order_service_1.deleteOrderService)(id);
        if (!res)
            return c.text("user not deleted!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteOrder = deleteOrder;
