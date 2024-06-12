"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginService = exports.createAuthUserService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const createAuthUserService = async (user) => {
    await db_1.default.insert(schema_1.authTokens).values(user);
    return "user created successfully! 👽";
};
exports.createAuthUserService = createAuthUserService;
const userLoginService = async (user) => {
    // get the username and password from the user object
    const { username, password } = user;
    // get the user from the database
    return await db_1.default.query.authTokens.findFirst({
        columns: {
            username: true,
            role: true,
            password: true,
        },
        where: (0, drizzle_orm_1.sql) `${schema_1.authTokens.username} = ${username}`,
        with: {
            user: {
                columns: {
                    name: true,
                    contact_phone: true,
                    email: true,
                    id: true,
                },
            },
        },
    });
};
exports.userLoginService = userLoginService;
