"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const state_controller_1 = require("./state.controller");
const validators_1 = require("../validators");
exports.stateRouter = new hono_1.Hono();
exports.stateRouter.get("/states", state_controller_1.listState);
exports.stateRouter.get("/state/:id", state_controller_1.getSingleState);
exports.stateRouter.post("/state", (0, zod_validator_1.zValidator)("json", validators_1.stateSchema, (results, c) => {
    // Explicitly type the 'c' parameter as 'Response'
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), state_controller_1.createState);
exports.stateRouter.put("/state/:id", state_controller_1.updateState);
exports.stateRouter.delete("/state/:id", state_controller_1.deleteState);
exports.stateRouter.get("/states_with_cities", state_controller_1.stateWithCity);
