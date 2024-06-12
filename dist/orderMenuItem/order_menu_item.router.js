"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderMenuItemRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const order_menu_item_controller_1 = require("./order_menu_item.controller");
exports.orderMenuItemRouter = new hono_1.Hono();
//get all order menu items
exports.orderMenuItemRouter.get("/order_menu_items", order_menu_item_controller_1.listOrderMenuItems);
exports.orderMenuItemRouter.get("/order_menu_items/:id", order_menu_item_controller_1.getSingleOrderMenuItem);
exports.orderMenuItemRouter.post("/order_menu_items", (0, zod_validator_1.zValidator)("json", validators_1.orderMenuItemSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), order_menu_item_controller_1.createOrderMenuItem);
exports.orderMenuItemRouter.put("/order_menu_items/:id", (0, zod_validator_1.zValidator)("json", validators_1.orderMenuItemSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), order_menu_item_controller_1.updateOrderMenuItem);
exports.orderMenuItemRouter.delete("/order_menu_items/:id", order_menu_item_controller_1.deleteOrderMenuItem);
