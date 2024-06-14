import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { menuItemSchema } from "../validators";

import {
  listMenuItems,
  getSingleMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  menuItemWithRestaurantCategoryOrderMenuItem,
} from "./menuitem.controller";

export const menuItemRouter = new Hono();

//get all menuItems
menuItemRouter.get("/menuItems", listMenuItems);

menuItemRouter.get("/menuItems/:id", getSingleMenuItem);

menuItemRouter.post(
  "/menuItems",
  zValidator("json", menuItemSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  createMenuItem
);

menuItemRouter.put(
  "/menuItems/:id",
  zValidator("json", menuItemSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  updateMenuItem
);

menuItemRouter.delete("/menuItems/:id", deleteMenuItem);

menuItemRouter.get(
  "/menuitem_with_restaurant_category_order_menu_item",
  menuItemWithRestaurantCategoryOrderMenuItem
);
