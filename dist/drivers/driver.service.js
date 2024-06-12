"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriverService = exports.updateDriverService = exports.createDriverService = exports.getDriverService = exports.driverService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
//select all driver
const driverService = async () => {
    return await db_1.default.query.Driver.findMany();
};
exports.driverService = driverService;
//select one driver
const getDriverService = async (id) => {
    return await db_1.default.query.Driver.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Driver.id, id),
    });
};
exports.getDriverService = getDriverService;
//create driver
const createDriverService = async (driver) => {
    await db_1.default.insert(schema_1.Driver).values(driver);
    return driver;
};
exports.createDriverService = createDriverService;
//update user
const updateDriverService = async (id, driver) => {
    await db_1.default.update(schema_1.Driver).set(driver).where((0, drizzle_orm_1.eq)(schema_1.Driver.id, id));
    return driver;
};
exports.updateDriverService = updateDriverService;
//delete user
const deleteDriverService = async (id) => {
    await db_1.default.delete(schema_1.Driver).where((0, drizzle_orm_1.eq)(schema_1.Driver.id, id));
    return "user deleted successfully!😑";
};
exports.deleteDriverService = deleteDriverService;
