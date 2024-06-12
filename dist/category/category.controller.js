"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getSingleCategory = exports.listCategories = void 0;
const category_service_1 = require("./category.service");
const listCategories = async (c) => {
    try {
        const category = await (0, category_service_1.getCategoryService)();
        if (category == null || category.length == 0) {
            return c.text("No category found", 404);
        }
        return c.json(category, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.listCategories = listCategories;
const getSingleCategory = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const category = await (0, category_service_1.getSingleCategoryService)(id);
        if (category == null) {
            return c.text("Category not found", 404);
        }
        return c.json(category, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getSingleCategory = getSingleCategory;
const createCategory = async (c) => {
    try {
        const category = await c.req.json();
        const result = await (0, category_service_1.createCategoryService)(category);
        if (!result) {
            return c.text("Category not created", 400);
        }
        return c.json({ message: result }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createCategory = createCategory;
const updateCategory = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const category = await c.req.json();
        // search for user by id
        const categoryExist = await (0, category_service_1.getSingleCategoryService)(id);
        if (!categoryExist == null) {
            return c.text("Category not found", 404);
        }
        const result = await (0, category_service_1.updateCategoryService)(id, category);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.text("Invalid id", 400);
    }
    try {
        // search for category
        const category = await (0, category_service_1.getSingleCategoryService)(id);
        if (!category) {
            return c.text("Category not found", 404);
        }
        const result = await (0, category_service_1.deleteCategoryService)(id);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteCategory = deleteCategory;
