import { Hono } from "hono";
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { get } from "http";
import {
  listRestaurants,
  getSingleRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  restaurantWithMenuItemsAndOrder,
} from "./restaurant.controller";

import { restaurantSchema } from "../validators";

export const restaurantRouter = new Hono();

//get all restaurants
restaurantRouter.get("/restaurants", listRestaurants);
restaurantRouter.get("/restaurants/:id", getSingleRestaurant);

restaurantRouter.post(
  "/restaurants",
  zValidator("json", restaurantSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  createRestaurant
);

restaurantRouter.put("/restaurants/:id", updateRestaurant);
restaurantRouter.delete("/restaurants/:id", deleteRestaurant);


restaurantRouter.get(
  "/restaurants_with_menuItems_and_orders",
  restaurantWithMenuItemsAndOrder
);