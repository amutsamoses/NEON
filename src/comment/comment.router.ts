import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";

import { commentSchema } from "../validators";

import {
  listComments,
  getSingleComment,
  createComment,
  updateComment,
  deleteComment,
  commentWithUserOrder,
} from "./comment.controller";

import {
  adminRoleAuth,
  userRoleAuth,
  bothRoleAuth,
} from "../middleware/bearAuth";

export const commentRouter = new Hono();

//get all comments
commentRouter.get("/comments", bothRoleAuth, listComments);

commentRouter.get("/comments/:id", bothRoleAuth, getSingleComment);

commentRouter.post(
  "/comments",
  zValidator("json", commentSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  userRoleAuth,
  createComment
);

commentRouter.put(
  "/comments/:id",
  zValidator("json", commentSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  userRoleAuth,
  updateComment
);

commentRouter.delete("/comments/:id", userRoleAuth, deleteComment);

commentRouter.get("/comment_with_user_order", commentWithUserOrder);
