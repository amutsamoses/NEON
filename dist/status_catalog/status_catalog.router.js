"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCatalogRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const status_catalog_controller_1 = require("./status_catalog.controller");
exports.statusCatalogRouter = new hono_1.Hono();
//get all status catalogs
exports.statusCatalogRouter.get("/status_catalogs", status_catalog_controller_1.listStatusCatalog);
exports.statusCatalogRouter.get("/status_catalogs/:id", status_catalog_controller_1.getSingleStatusCatalog);
exports.statusCatalogRouter.post("/status_catalogs", (0, zod_validator_1.zValidator)("json", validators_1.statusCatalogSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), status_catalog_controller_1.createStatusCatalog);
exports.statusCatalogRouter.put("/status_catalogs/:id", (0, zod_validator_1.zValidator)("json", validators_1.statusCatalogSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), status_catalog_controller_1.updateStatusCatalog);
exports.statusCatalogRouter.delete("/status_catalogs/:id", status_catalog_controller_1.deleteStatusCatalog);
