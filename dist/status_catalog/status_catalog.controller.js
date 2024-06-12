"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusCatalog = exports.updateStatusCatalog = exports.createStatusCatalog = exports.getSingleStatusCatalog = exports.listStatusCatalog = void 0;
const status_catalog_service_1 = require("./status_catalog.service");
const listStatusCatalog = async (c) => {
    try {
        const statusCatalog = await (0, status_catalog_service_1.getStatusCatalogService)();
        if (statusCatalog == null || statusCatalog.length == 0) {
            return c.text("No status catalog found", 404);
        }
        return c.json(statusCatalog, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.listStatusCatalog = listStatusCatalog;
const getSingleStatusCatalog = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const statusCatalog = await (0, status_catalog_service_1.getSingleStatusCatalogService)(id);
        if (statusCatalog == null) {
            return c.text("Status Catalog not found", 404);
        }
        return c.json(statusCatalog, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getSingleStatusCatalog = getSingleStatusCatalog;
const createStatusCatalog = async (c) => {
    try {
        const statusCatalog = await c.req.json();
        const result = await (0, status_catalog_service_1.createStatusCatalogService)(statusCatalog);
        if (!result) {
            return c.text("Status Catalog not created", 400);
        }
        return c.json({ message: result }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createStatusCatalog = createStatusCatalog;
const updateStatusCatalog = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const statusCatalog = await c.req.json();
        // search for user by id
        const statusCatalogFound = await (0, status_catalog_service_1.getSingleStatusCatalogService)(id);
        if (!statusCatalogFound == null) {
            return c.text("Status Catalog not found", 404);
        }
        const result = await (0, status_catalog_service_1.updateStatusCatalogService)(id, statusCatalog);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateStatusCatalog = updateStatusCatalog;
const deleteStatusCatalog = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.text("Invalid id", 400);
    }
    try {
        // search for status catalog
        const statusCatalog = await (0, status_catalog_service_1.getSingleStatusCatalogService)(id);
        if (!statusCatalog) {
            return c.text("Status Catalog not found", 404);
        }
        const result = await (0, status_catalog_service_1.deleteStatusCatalogService)(id);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteStatusCatalog = deleteStatusCatalog;
