"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const order_status_controller_1 = require("./order_status.controller");
exports.orderStatusRouter = new hono_1.Hono();
//get all orderStatuses
exports.orderStatusRouter.get("/orderStatuses", order_status_controller_1.listOrderStatuses);
exports.orderStatusRouter.get("/orderStatuses/:id", order_status_controller_1.getSingleOrderStatus);
exports.orderStatusRouter.post("/orderStatuses", (0, zod_validator_1.zValidator)("json", validators_1.orderStatusSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), order_status_controller_1.createOrderStatus);
exports.orderStatusRouter.put("/orderStatuses/:id", (0, zod_validator_1.zValidator)("json", validators_1.orderStatusSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), order_status_controller_1.updateOrderStatus);
exports.orderStatusRouter.delete("/orderStatuses/:id", order_status_controller_1.deleteOrderStatus);
