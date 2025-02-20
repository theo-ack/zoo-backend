import { Hono } from "hono";
import { CompoundModel } from "../models/compound.js";

export const compoundRouter = new Hono();

compoundRouter.get("/", async (c) => {
  try {
    // Logik
    const compounds = await CompoundModel.findAll();
    return c.json({
      data: compounds,
    });
  } catch (error) {
    // Error handling
    console.error(error);
    c.json({
      error: "Oh Snap! Something went wrong.",
    });
  }
});

compoundRouter.put("/", async (c) => {
  try {
    const body = await c.req.json();
    // Logik
    const updatedCompounds = await CompoundModel.update(body);
    return c.json({
      message: "Update successful",
      data: updatedCompounds,
    });
  } catch (error) {
    // Error handling
    console.error(error);
    c.json({
      error: "Oh Snap! Something went wrong.",
    });
  }
}); // mit ganzem object inkl id

compoundRouter.patch("/:id", async (c) => {
  // .. teilweise update über id
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    const partialUpdateCompund = await CompoundModel.partialUpdate(
      parseInt(id),
      body
    );

    return c.json({
      message: "Update successful",
      data: partialUpdateCompund,
    });
  } catch (error) {
    console.log(error);
    c.json({
      error: "Oh Snap! Something went wrong.",
    });
  }
});
