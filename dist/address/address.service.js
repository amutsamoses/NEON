"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressService = exports.updateAddressService = exports.createAddressService = exports.getSingleAddressService = exports.getAddressService = void 0;
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
// GET ALL ADDRESSES
const getAddressService = async () => {
    const address = await db_1.default.query.Address.findMany();
    return address;
};
exports.getAddressService = getAddressService;
// GET SINGLE ADDRESS
const getSingleAddressService = async (id) => {
    const address = await db_1.default.query.Address.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Address.id, id),
    });
    return address;
};
exports.getSingleAddressService = getSingleAddressService;
// CREATE ADDRESS
const createAddressService = async (address) => {
    await db_1.default.insert(schema_1.Address).values(address);
    return "Address created successfully";
};
exports.createAddressService = createAddressService;
//  UPDATE ADDRESS
const updateAddressService = async (id, address) => {
    await db_1.default.update(schema_1.Address).set(address).where((0, drizzle_orm_1.eq)(schema_1.Address.id, id));
    return "Address updated successfully";
};
exports.updateAddressService = updateAddressService;
// DELETE ADDRESS
const deleteAddressService = async (id) => {
    await db_1.default.delete(schema_1.Address).where((0, drizzle_orm_1.eq)(schema_1.Address.id, id));
    return "Address deleted successfully";
};
exports.deleteAddressService = deleteAddressService;
