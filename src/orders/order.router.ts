import { Hono } from "hono";
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";


import {
  listOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  orderWithAllDetail
} from "./order.controller";

import { orderSchema } from "../validators";

export const orderRouter = new Hono();

//get all restaurants
orderRouter.get("/orders", listOrders);
orderRouter.get("/orders/:id", getSingleOrder);

orderRouter.post(
  "/orders",
  zValidator("json", orderSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  createOrder
);

orderRouter.put("/orders/:id", updateOrder);
orderRouter.delete("/orders/:id", deleteOrder);

orderRouter.get("/orders_with_details", orderWithAllDetail);
