"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusCatalogService = exports.updateStatusCatalogService = exports.createStatusCatalogService = exports.getSingleStatusCatalogService = exports.getStatusCatalogService = void 0;
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
// GET ALL STATUS CATALOG
const getStatusCatalogService = async () => {
    const statusCatalog = await db_1.default.select().from(schema_1.StatusCatalog);
    return statusCatalog;
};
exports.getStatusCatalogService = getStatusCatalogService;
// GET SINGLE STATUS CATALOG
const getSingleStatusCatalogService = async (id) => {
    const statusCatalog = await db_1.default.query.StatusCatalog.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.StatusCatalog.id, id),
    });
    return statusCatalog;
};
exports.getSingleStatusCatalogService = getSingleStatusCatalogService;
// CREATE STATUS CATALOG
const createStatusCatalogService = async (statusCatalog) => {
    await db_1.default.insert(schema_1.StatusCatalog).values(statusCatalog);
    return "Status Catalog created successfully";
};
exports.createStatusCatalogService = createStatusCatalogService;
//  UPDATE STATUS CATALOG
const updateStatusCatalogService = async (id, statusCatalog) => {
    await db_1.default
        .update(schema_1.StatusCatalog)
        .set(statusCatalog)
        .where((0, drizzle_orm_1.eq)(schema_1.StatusCatalog.id, id));
    return "Status Catalog updated successfully";
};
exports.updateStatusCatalogService = updateStatusCatalogService;
// DELETE STATUS CATALOG
const deleteStatusCatalogService = async (id) => {
    await db_1.default.delete(schema_1.StatusCatalog).where((0, drizzle_orm_1.eq)(schema_1.StatusCatalog.id, id));
    return "Status Catalog deleted successfully";
};
exports.deleteStatusCatalogService = deleteStatusCatalogService;
