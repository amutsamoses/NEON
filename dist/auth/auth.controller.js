"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
require("dotenv/config");
const auth_service_1 = require("./auth.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("hono/jwt");
const registerUser = async (c) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bcrypt.hash(pass, 10);
        user.password = hashedPassword;
        const createdUser = await (0, auth_service_1.createAuthUserService)(user);
        if (!createdUser) {
            return c.text("user not created!👽", 404);
        }
        return c.json({ msg: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.registerUser = registerUser;
const loginUser = async (c) => {
    try {
        const user = await c.req.json();
        console.log('User input:', user);
        // check if the user exist
        const userExist = await (0, auth_service_1.userLoginService)(user);
        console.log('User exist:', userExist);
        // check if the user exist in the database or not
        if (userExist === null) {
            return c.json({ error: "user not found" }, 404);
        }
        // compare the password with the hashed password
        const userMatch = await bcrypt.compare(user.password, userExist?.password);
        console.log('Password match:', userMatch);
        if (!userMatch) {
            return c.json({ error: "password does not match" }, 400);
        }
        else {
            // create the payload for the jwt token
            const payload = {
                sub: userExist?.username,
                role: userExist?.role,
                exp: Math.floor(Date.now() / 1000) + 60 * 180, // 3 hours expiration
            };
            const secret = process.env.JWT_SECRET; // secret key for jwt
            const token = await (0, jwt_1.sign)(payload, secret); // sign the token with the payload and secret key
            const userDetails = userExist?.user; // get the user from the userExist object
            const role = userExist?.role; // get the role from the userExist object
            console.log('Token:', token);
            console.log('User details:', userDetails);
            return c.json({ token, user: { role, ...userDetails } }, 200); // return the token and user object
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        return c.json({ error: error?.message }, 400);
    }
};
exports.loginUser = loginUser;
