"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoleAuth = exports.adminRoleAuth = exports.authMiddleware = exports.verifyToken = void 0;
require("dotenv/config");
const jwt_1 = require("hono/jwt");
// bearAuth middleware to verify the jwt token
// and check if the user is authenticated
const verifyToken = async (token, secret) => {
    try {
        // verify the token with the secret key
        const decode = await (0, jwt_1.verify)(token, secret);
        // return the decoded token
        return decode;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
// bearAuth middleware to verify the jwt token
// and check if the user is authenticated
const authMiddleware = async (c, next, requiredRole) => {
    try {
        // get the token from the request header
        const token = c.req.header("Authorization");
        // get the secret key from the env file
        let secret = process.env.JWT_SECRET;
        // check if the token is not present
        if (!token) {
            return c.json({ error: "token not found" }, 401);
        }
        // verify the token
        const decoded = await (0, exports.verifyToken)(token, secret);
        // check if the token is not verified
        if (!decoded) {
            return c.json({ error: "token not verified" }, 401);
        }
        // check if the role is not the required role
        if (decoded.role !== requiredRole) {
            return c.json({ error: "unauthorized access" }, 401);
        }
        //pass the token and user object to the context
        // call the next middleware
        return next();
    }
    catch (error) {
        // catch any error and return the error message
        return c.json({ error: error?.message }, 400);
    }
};
exports.authMiddleware = authMiddleware;
// adminRoleAuth middleware to check if the user is authenticated
const adminRoleAuth = async (c, next) => {
    // call the authMiddleware function with the required role
    await (0, exports.authMiddleware)(c, next, "admin");
};
exports.adminRoleAuth = adminRoleAuth;
// userRoleAuth middleware to check if the user is authenticated
const userRoleAuth = async (c, next) => {
    // call the authMiddleware function with the required role
    await (0, exports.authMiddleware)(c, next, "user");
};
exports.userRoleAuth = userRoleAuth;
