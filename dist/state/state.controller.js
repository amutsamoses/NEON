"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateWithCity = exports.deleteState = exports.updateState = exports.createState = exports.getSingleState = exports.listState = void 0;
const state_service_1 = require("./state.service");
const listState = async (c) => {
    try {
        const data = await (0, state_service_1.stateService)();
        if (data == null) {
            return c.text("no user found!😶‍🌫️👽", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listState = listState;
const getSingleState = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const user = await (0, state_service_1.getStateService)(id);
    if (user == undefined) {
        return c.text("user not found!👽", 404);
    }
    return c.json(user, 200);
};
exports.getSingleState = getSingleState;
const createState = async (c) => {
    try {
        const user = await c.req.json();
        const createdState = await (0, state_service_1.createStateService)(user);
        if (!createdState) {
            return c.text("user not created!👽", 404);
        }
        return c.json({ msg: createdState }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createState = createState;
const updateState = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const user = await c.req.json();
    try {
        //search for state
        const foundState = await (0, state_service_1.getStateService)(id);
        if (foundState == undefined)
            return c.text("user not found!👽", 404);
        //get the data and update
        const res = await (0, state_service_1.updateStateService)(id, user);
        //return the updated user
        if (!res)
            return c.text("user not updated!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateState = updateState;
//delete user
const deleteState = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    try {
        //search for the user
        const user = await (0, state_service_1.getStateService)(id);
        if (user == undefined)
            return c.text("user not found!👽", 404);
        //delete the user
        const res = await (0, state_service_1.deleteStateService)(id);
        if (!res)
            return c.text("user not deleted!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteState = deleteState;
const stateWithCity = async (c) => {
    try {
        const data = await (0, state_service_1.stateCityService)();
        if (data == null) {
            return c.text("no State with Cities not found!😶‍🌫️👽", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.stateWithCity = stateWithCity;
