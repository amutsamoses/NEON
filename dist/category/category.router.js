"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const category_controller_1 = require("./category.controller");
exports.categoryRouter = new hono_1.Hono();
//get all categories
exports.categoryRouter.get("/categories", category_controller_1.listCategories);
exports.categoryRouter.get("/categories/:id", category_controller_1.getSingleCategory);
exports.categoryRouter.post("/categories", (0, zod_validator_1.zValidator)("json", validators_1.categorySchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), category_controller_1.createCategory);
exports.categoryRouter.put("/categories/:id", (0, zod_validator_1.zValidator)("json", validators_1.categorySchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), category_controller_1.updateCategory);
exports.categoryRouter.delete("/categories/:id", category_controller_1.deleteCategory);
