import { Hono } from "hono";
import { getPool } from "../db/db.js";
import { ZooModal } from "../models/zoo.js";

export const zooRouter = new Hono();

zooRouter.get("/", async (c) => {
  try {
    const zoo = await ZooModal.findAll();
    return c.json({
      data: zoo,
    });
  } catch (error) {
    console.error(error);
    return c.json({
      error: "Oh snap, something went wrong.",
    });
  }
});
