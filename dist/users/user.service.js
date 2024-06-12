"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getSingleUserService = exports.userService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const userService = async () => {
    return await db_1.default.query.Users.findMany();
};
exports.userService = userService;
//get one user
const getSingleUserService = async (id) => {
    return await db_1.default.query.Users.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Users.id, id),
    });
};
exports.getSingleUserService = getSingleUserService;
//create user
const createUserService = async (user) => {
    await db_1.default.insert(schema_1.Users).values(user);
    return user;
};
exports.createUserService = createUserService;
//update user
const updateUserService = async (id, user) => {
    await db_1.default.update(schema_1.Users).set(user).where((0, drizzle_orm_1.eq)(schema_1.Users.id, id));
    return user;
};
exports.updateUserService = updateUserService;
//delete user
const deleteUserService = async (id) => {
    await db_1.default.delete(schema_1.Users).where((0, drizzle_orm_1.eq)(schema_1.Users.id, id));
    return "user deleted successfully!😑";
};
exports.deleteUserService = deleteUserService;
