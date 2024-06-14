import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validators";

import {
  listAddresses,
  getSingleAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  addressWithUser,
  limitAddress,
} from "./address.controller";
import {
  adminRoleAuth,
  userRoleAuth,
  bothRoleAuth,
} from "../middleware/bearAuth";

export const addressRouter = new Hono();

//get all addresses
addressRouter.get("/addresses", adminRoleAuth, listAddresses);

addressRouter.get("/addresses/:id", bothRoleAuth, getSingleAddress);

addressRouter.post(
  "/addresses",
  zValidator("json", addressSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  bothRoleAuth,
  createAddress
);

addressRouter.put(
  "/addresses/:id",
  zValidator("json", addressSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  bothRoleAuth,
  updateAddress
);

addressRouter.delete("/addresses/:id", bothRoleAuth, deleteAddress);

addressRouter.get("/address_with_user_city_orders", addressWithUser);

addressRouter.get("/limit_address", adminRoleAuth, limitAddress);
