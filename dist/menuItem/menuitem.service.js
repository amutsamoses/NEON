"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItemService = exports.updateMenuItemService = exports.createMenuItemService = exports.getSingleMenuItemService = exports.getMenuItemService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
// GET ALL MENUITEMS
const getMenuItemService = async () => {
    const menuItem = await db_1.default.query.MenuItem.findMany();
    return menuItem;
};
exports.getMenuItemService = getMenuItemService;
// GET SINGLE MENUITEM
const getSingleMenuItemService = async (id) => {
    const menuItem = await db_1.default.query.MenuItem.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.MenuItem.id, id),
    });
    return menuItem;
};
exports.getSingleMenuItemService = getSingleMenuItemService;
// CREATE MENUITEM
const createMenuItemService = async (menuItem) => {
    await db_1.default.insert(schema_1.MenuItem).values(menuItem);
    return "MenuItem created successfully";
};
exports.createMenuItemService = createMenuItemService;
//  UPDATE MENUITEM
const updateMenuItemService = async (id, menuItem) => {
    await db_1.default.update(schema_1.MenuItem).set(menuItem).where((0, drizzle_orm_1.eq)(schema_1.MenuItem.id, id));
    return "MenuItem updated successfully";
};
exports.updateMenuItemService = updateMenuItemService;
// DELETE MENUITEM
const deleteMenuItemService = async (id) => {
    await db_1.default.delete(schema_1.MenuItem).where((0, drizzle_orm_1.eq)(schema_1.MenuItem.id, id));
    return "MenuItem deleted successfully";
};
exports.deleteMenuItemService = deleteMenuItemService;
