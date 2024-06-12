"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.getSingleComment = exports.listComments = void 0;
const comment_service_1 = require("./comment.service");
const listComments = async (c) => {
    try {
        const comment = await (0, comment_service_1.getCommentService)();
        if (comment == null || comment.length == 0) {
            return c.text("No comment found", 404);
        }
        return c.json(comment, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.listComments = listComments;
const getSingleComment = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const comment = await (0, comment_service_1.getSingleCommentService)(id);
        if (comment == null) {
            return c.text("Comment not found", 404);
        }
        return c.text("Comment not found", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getSingleComment = getSingleComment;
const createComment = async (c) => {
    try {
        const comment = await c.req.json();
        const result = await (0, comment_service_1.createCommentService)(comment);
        if (!result) {
            return c.text("Comment not created", 400);
        }
        return c.json({ message: result }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createComment = createComment;
const updateComment = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const comment = await c.req.json();
        // search for user by id
        const commentFound = await (0, comment_service_1.getSingleCommentService)(id);
        if (commentFound == null) {
            return c.text("Comment not found", 404);
        }
        const result = await (0, comment_service_1.updateCommentService)(id, comment);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateComment = updateComment;
const deleteComment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.text("Invalid id", 400);
    }
    try {
        const comment = await (0, comment_service_1.getSingleCommentService)(id);
        if (!comment) {
            return c.text("Comment not found", 404);
        }
        const result = await (0, comment_service_1.deleteCommentService)(id);
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteComment = deleteComment;
