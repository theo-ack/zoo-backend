import { Hono } from "hono";

import { AnimalModel } from "../models/animal.js";
import { StaffModel } from "../models/staff.js";

export const staffRouter = new Hono();

staffRouter.get("/", async (c) => {
  try {
    // Logik
    const staff = await StaffModel.findAll();
    return c.json({
      data: staff,
    });
  } catch (error) {
    // Error handling
    console.error(error);
    c.json({
      error: "Oh Snap! Something went wrong.",
    });
  }
});
