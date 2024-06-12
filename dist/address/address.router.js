"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const address_controller_1 = require("./address.controller");
exports.addressRouter = new hono_1.Hono();
//get all addresses
exports.addressRouter.get("/addresses", address_controller_1.listAddresses);
exports.addressRouter.get("/addresses/:id", address_controller_1.getSingleAddress);
exports.addressRouter.post("/addresses", (0, zod_validator_1.zValidator)("json", validators_1.addressSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), address_controller_1.createAddress);
exports.addressRouter.put("/addresses/:id", (0, zod_validator_1.zValidator)("json", validators_1.addressSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), address_controller_1.updateAddress);
exports.addressRouter.delete("/addresses/:id", address_controller_1.updateAddress);
