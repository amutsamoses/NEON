"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.updateAddress = exports.createAddress = exports.getSingleAddress = exports.listAddresses = void 0;
const address_service_1 = require("./address.service");
const listAddresses = async (c) => {
    try {
        const address = await (0, address_service_1.getAddressService)();
        if (address == null || address.length == 0) {
            return c.text("No address found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.listAddresses = listAddresses;
const getSingleAddress = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, address_service_1.getSingleAddressService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.text("Address not found", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getSingleAddress = getSingleAddress;
const createAddress = async (c) => {
    try {
        const address = await c.req.json();
        const result = await (0, address_service_1.createAddressService)(address);
        if (!result) {
            return c.text("Address not created", 400);
        }
        return c.json({ message: result }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createAddress = createAddress;
const updateAddress = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, address_service_1.getSingleAddressService)(id);
        if (!updatedAddress === null) {
            return c.text("Address not found", 404);
        }
        // get data to update
        const res = await (0, address_service_1.updateAddressService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateAddress = updateAddress;
const deleteAddress = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.text("Invalid id", 400);
    }
    try {
        // search for address
        const address = await (0, address_service_1.getSingleAddressService)(id);
        if (!address) {
            return c.text("Address not found", 404);
        }
        // delete address
        const res = await (0, address_service_1.deleteAddressService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteAddress = deleteAddress;
