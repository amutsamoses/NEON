"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.updateCategoryService = exports.createCategoryService = exports.getSingleCategoryService = exports.getCategoryService = void 0;
const schema_1 = require("../drizzle/schema");
const db_1 = require("../drizzle/db");
const drizzle_orm_1 = require("drizzle-orm");
// GET ALL CATEGORIES
const getCategoryService = async () => {
    const category = await db_1.default.select().from(schema_1.Category);
    return category;
};
exports.getCategoryService = getCategoryService;
// GET SINGLE CATEGORY
const getSingleCategoryService = async (id) => {
    const category = await db_1.default.select().from(schema_1.Category).where((0, drizzle_orm_1.eq)(schema_1.Category.id, id));
    return category;
};
exports.getSingleCategoryService = getSingleCategoryService;
// CREATE CATEGORY
const createCategoryService = async (category) => {
    await db_1.default.insert(schema_1.Category).values(category);
    return "Category created successfully";
};
exports.createCategoryService = createCategoryService;
//  UPDATE CATEGORY
const updateCategoryService = async (id, category) => {
    await db_1.default.update(schema_1.Category).set(category).where((0, drizzle_orm_1.eq)(schema_1.Category.id, id));
    return "Category updated successfully";
};
exports.updateCategoryService = updateCategoryService;
// DELETE CATEGORY
const deleteCategoryService = async (id) => {
    await db_1.default.delete(schema_1.Category).where((0, drizzle_orm_1.eq)(schema_1.Category.id, id));
    return "Category deleted successfully";
};
exports.deleteCategoryService = deleteCategoryService;
