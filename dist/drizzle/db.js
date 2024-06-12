"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.client = void 0;
const neon_http_1 = require("drizzle-orm/neon-http");
const serverless_1 = require("@neondatabase/serverless");
const dotenv_1 = require("dotenv");
const schema = require("./schema");
(0, dotenv_1.config)({ path: ".env" });
exports.client = (0, serverless_1.neon)(process.env.DATABASE_URL);
exports.db = (0, neon_http_1.drizzle)(exports.client, { schema, logger: true });
exports.default = exports.db;