import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  listUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  userWithOrder,
} from "./user.controller";
import { userSchema } from "../validators";
import {
  adminRoleAuth,
  authMiddleware,
  userRoleAuth,
} from "../middleware/bearAuth";

export const userRouter = new Hono();

// const users = [
//     {
//         id: 1,
//         name: "John Doe",
//         email: "john@gmail.com"
//     },
//     {
//         id: 2,
//         name: "Jane Doe",
//         email: "jane@gmail.com"}
// ]

interface TUsers {
  id: number;
  name: string;
  email: string;
}

userRouter.get("/users", adminRoleAuth, listUsers);
userRouter.get("/users/:id", userRoleAuth, getSingleUser);
userRouter.post(
  "/users",
  zValidator("json", userSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  createUser
);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);

userRouter.get("/users_with_orders", userWithOrder);
