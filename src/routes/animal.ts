import { Hono } from "hono";

import { AnimalModel } from "../models/animal.js";
import { AnimalSchema } from "../types.js";
import { error } from "console";

export const animalRouter = new Hono();

animalRouter.get("/", async (c) => {
  try {
    // Logik
    const animals = await AnimalModel.findAll();
    return c.json({
      data: animals,
    });
  } catch (error) {
    // Error handling
    console.error(error);
    c.json({
      error: "Oh Snap! Something went wrong.",
    });
  }
});

animalRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const result = await AnimalSchema.safeParseAsync(body);

    if (!result.success)
      return c.json(
        {
          error: result.error,
        },
        400
      );

    //here is data valid, pares, and validaded
    return c.json(result.data);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return c.json({ error: "No JSON body provided" });
    }
    console.error(error);
    return c.json({
      error: "Oh Snap! Something went wrong.",
    });
  }
});
