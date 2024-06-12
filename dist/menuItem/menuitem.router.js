"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const menuitem_controller_1 = require("./menuitem.controller");
exports.menuItemRouter = new hono_1.Hono();
//get all menuItems
exports.menuItemRouter.get("/menuItems", menuitem_controller_1.listMenuItems);
exports.menuItemRouter.get("/menuItems/:id", menuitem_controller_1.getSingleMenuItem);
exports.menuItemRouter.post("/menuItems", (0, zod_validator_1.zValidator)("json", validators_1.menuItemSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), menuitem_controller_1.createMenuItem);
exports.menuItemRouter.put("/menuItems/:id", (0, zod_validator_1.zValidator)("json", validators_1.menuItemSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), menuitem_controller_1.updateMenuItem);
exports.menuItemRouter.delete("/menuItems/:id", menuitem_controller_1.deleteMenuItem);
