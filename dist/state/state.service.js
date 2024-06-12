"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateCityService = exports.deleteStateService = exports.updateStateService = exports.createStateService = exports.getStateService = exports.stateService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
//get all states
const stateService = async () => {
    return await db_1.default.query.State.findMany();
};
exports.stateService = stateService;
//get one state
const getStateService = async (id) => {
    return await db_1.default.query.State.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.State.id, id),
    });
};
exports.getStateService = getStateService;
//create state
const createStateService = async (user) => {
    await db_1.default.insert(schema_1.State).values(user);
    return user;
};
exports.createStateService = createStateService;
//update state
const updateStateService = async (id, user) => {
    await db_1.default.update(schema_1.State).set(user).where((0, drizzle_orm_1.eq)(schema_1.State.id, id));
    return user;
};
exports.updateStateService = updateStateService;
//delete state
const deleteStateService = async (id) => {
    await db_1.default.delete(schema_1.State).where((0, drizzle_orm_1.eq)(schema_1.State.id, id));
    return "user deleted successfully!😑";
};
exports.deleteStateService = deleteStateService;
const stateCityService = async () => {
    return await db_1.default.query.State.findMany({
        with: {
            cities: true,
        },
    });
};
exports.stateCityService = stateCityService;
