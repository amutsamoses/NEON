"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const comment_controller_1 = require("./comment.controller");
exports.commentRouter = new hono_1.Hono();
//get all comments
exports.commentRouter.get("/comments", comment_controller_1.listComments);
exports.commentRouter.get("/comments/:id", comment_controller_1.getSingleComment);
exports.commentRouter.post("/comments", (0, zod_validator_1.zValidator)("json", validators_1.commentSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), comment_controller_1.createComment);
exports.commentRouter.put("/comments/:id", (0, zod_validator_1.zValidator)("json", validators_1.commentSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), comment_controller_1.updateComment);
exports.commentRouter.delete("/comments/:id", comment_controller_1.deleteComment);
