import { Hono } from "hono";
import { type Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  listCities,
  getSingleCity,
  createCity,
  updateCity,
  deleteCity,
  cityWithStateAndAddress,
} from "./city.controller";
import {
  adminRoleAuth,
  userRoleAuth,
  bothRoleAuth,
} from "../middleware/bearAuth";
import { citySchema } from "../validators";

export const cityRouter = new Hono();

cityRouter.get("/cities", bothRoleAuth, listCities);
cityRouter.get("/cities/:id", bothRoleAuth, getSingleCity);
cityRouter.post(
  "/cities",
  zValidator("json", citySchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  adminRoleAuth,
  createCity
);
cityRouter.put("/cities/:id", adminRoleAuth, updateCity);
cityRouter.delete("/cities/:id", adminRoleAuth, deleteCity);

cityRouter.get("/cities_with_state_addresses", cityWithStateAndAddress);
