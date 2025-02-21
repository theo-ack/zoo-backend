import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { compoundRouter } from "./routes/compound.js";
import { cors } from "hono/cors";
import { animalRouter } from "./routes/animal.js";
import { staffRouter } from "./routes/staff.js";
import { zooRouter } from "./routes/zoo.js";

const app = new Hono();

// cors
app.use(cors());

// Connecting routes
app.route("/compounds", compoundRouter);
app.route("/animals", animalRouter);
app.route("/staff", staffRouter);
app.route("account", zooRouter);

app.get("/", async (c) => {
  return c.text("Hello Theo! 🔥");
});

serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(`Server is running on http://${info.address}:${info.port}`);
  }
);
