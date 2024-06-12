"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCityService = exports.updateCityService = exports.createCityService = exports.getCityService = exports.cityService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const cityService = async () => {
    return await db_1.default.query.City.findMany();
};
exports.cityService = cityService;
//get one city
const getCityService = async (id) => {
    return await db_1.default.query.City.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.City.id, id),
    });
};
exports.getCityService = getCityService;
//create city
const createCityService = async (city) => {
    await db_1.default.insert(schema_1.City).values(city);
    return city;
};
exports.createCityService = createCityService;
//update city
const updateCityService = async (id, city) => {
    await db_1.default.update(schema_1.City).set(city).where((0, drizzle_orm_1.eq)(schema_1.City.id, id));
    return city;
};
exports.updateCityService = updateCityService;
//delete city
const deleteCityService = async (id) => {
    await db_1.default.delete(schema_1.City).where((0, drizzle_orm_1.eq)(schema_1.City.id, id));
    return "user deleted successfully!😑";
};
exports.deleteCityService = deleteCityService;
