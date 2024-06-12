"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const order_controller_1 = require("./order.controller");
const validators_1 = require("../validators");
exports.orderRouter = new hono_1.Hono();
//get all restaurants
exports.orderRouter.get("/orders", order_controller_1.listOrders);
exports.orderRouter.get("/orders/:id", order_controller_1.getSingleOrder);
exports.orderRouter.post("/orders", (0, zod_validator_1.zValidator)("json", validators_1.orderSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), order_controller_1.createOrder);
exports.orderRouter.put("/orders/:id", order_controller_1.updateOrder);
exports.orderRouter.delete("/orders/:id", order_controller_1.deleteOrder);
