"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderMenuItem = exports.updateOrderMenuItem = exports.createOrderMenuItem = exports.getSingleOrderMenuItem = exports.listOrderMenuItems = void 0;
const order_menu_item_service_1 = require("./order_menu_item.service");
const listOrderMenuItems = async (c) => {
    try {
        const orderMenuItem = await (0, order_menu_item_service_1.getOrderMenuItemService)();
        if (orderMenuItem == null || orderMenuItem.length == 0) {
            return c.text("No order menu item found", 404);
        }
        return c.json(orderMenuItem, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.listOrderMenuItems = listOrderMenuItems;
const getSingleOrderMenuItem = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderMenuItem = await (0, order_menu_item_service_1.getSingleOrderMenuItemService)(id);
        if (orderMenuItem == null) {
            return c.text("Order Menu Item not found", 404);
        }
        return c.json(orderMenuItem, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getSingleOrderMenuItem = getSingleOrderMenuItem;
const createOrderMenuItem = async (c) => {
    try {
        const orderMenuItem = await c.req.json();
        const result = await (0, order_menu_item_service_1.createOrderMenuItemService)(orderMenuItem);
        if (!result) {
            return c.text("Order Menu Item not created", 400);
        }
        return c.json({ message: result }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createOrderMenuItem = createOrderMenuItem;
const updateOrderMenuItem = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderMenuItem = await c.req.json();
        const orderMenuItemExist = await (0, order_menu_item_service_1.getSingleOrderMenuItemService)(id);
        if (!orderMenuItemExist == null) {
            return c.text("Order Menu Item not found", 404);
        }
        const result = await (0, order_menu_item_service_1.updateOrderMenuItemService)(id, orderMenuItem);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateOrderMenuItem = updateOrderMenuItem;
const deleteOrderMenuItem = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.text("Invalid id", 400);
    }
    try {
        const orderMenuItem = await (0, order_menu_item_service_1.getSingleOrderMenuItemService)(id);
        if (!orderMenuItem) {
            return c.text("Order Menu Item not found", 404);
        }
        const result = await (0, order_menu_item_service_1.deleteOrderMenuItemService)(id);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteOrderMenuItem = deleteOrderMenuItem;
