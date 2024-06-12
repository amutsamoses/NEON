"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentService = exports.updateCommentService = exports.createCommentService = exports.getSingleCommentService = exports.getCommentService = void 0;
const schema_1 = require("../drizzle/schema");
const db_1 = require("../drizzle/db");
const drizzle_orm_1 = require("drizzle-orm");
// GET ALL COMMENTS
const getCommentService = async () => {
    const comment = await db_1.default.query.Comment.findMany();
    return comment;
};
exports.getCommentService = getCommentService;
// GET SINGLE COMMENT
const getSingleCommentService = async (id) => {
    const comment = await db_1.default.query.Comment.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Comment.id, id),
    });
    return comment;
};
exports.getSingleCommentService = getSingleCommentService;
//create comment
const createCommentService = async (comment) => {
    await db_1.default.insert(schema_1.Comment).values(comment);
    return "Comment created successfully";
};
exports.createCommentService = createCommentService;
//update comment
const updateCommentService = async (id, comment) => {
    await db_1.default.update(schema_1.Comment).set(comment).where((0, drizzle_orm_1.eq)(schema_1.Comment.id, id));
    return "Comment updated successfully";
};
exports.updateCommentService = updateCommentService;
// delete comment
const deleteCommentService = async (id) => {
    await db_1.default.delete(schema_1.Comment).where((0, drizzle_orm_1.eq)(schema_1.Comment.id, id));
    return "Comment deleted successfully";
};
exports.deleteCommentService = deleteCommentService;
