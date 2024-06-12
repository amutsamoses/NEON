"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItem = exports.updateMenuItem = exports.createMenuItem = exports.getSingleMenuItem = exports.listMenuItems = void 0;
const menuitem_service_1 = require("./menuitem.service");
const listMenuItems = async (c) => {
    try {
        const menuItem = await (0, menuitem_service_1.getMenuItemService)();
        if (menuItem == null || menuItem.length == 0) {
            return c.text("No menuItem found", 404);
        }
        return c.json(menuItem, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.listMenuItems = listMenuItems;
const getSingleMenuItem = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const menuItem = await (0, menuitem_service_1.getSingleMenuItemService)(id);
        if (menuItem == null) {
            return c.text("MenuItem not found", 404);
        }
        return c.json(menuItem, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getSingleMenuItem = getSingleMenuItem;
const createMenuItem = async (c) => {
    try {
        const menuItem = await c.req.json();
        const result = await (0, menuitem_service_1.createMenuItemService)(menuItem);
        if (!result) {
            return c.text("MenuItem not created", 400);
        }
        return c.json({ message: result }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createMenuItem = createMenuItem;
const updateMenuItem = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const menuItem = await c.req.json();
        // search for user by id
        const menuItemExist = await (0, menuitem_service_1.getSingleMenuItemService)(id);
        if (!menuItemExist == null) {
            return c.text("MenuItem not found", 404);
        }
        const result = await (0, menuitem_service_1.updateMenuItemService)(id, menuItem);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.text("Invalid id", 400);
    }
    try {
        const menuItem = await (0, menuitem_service_1.getSingleMenuItemService)(id);
        if (!menuItem) {
            return c.text("MenuItem not found", 404);
        }
        const result = await (0, menuitem_service_1.deleteMenuItemService)(id);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteMenuItem = deleteMenuItem;
