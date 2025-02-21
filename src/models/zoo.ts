import { HTTPException } from "hono/http-exception";
import { getPool } from "../db/db.js";

export class ZooModal {
  static async findAll() {
    const result = await getPool().query("SELECT * FROM zoo");

    if (result.rows.length === 0) {
      throw new HTTPException(404, {
        message: "No account found",
      });
    }

    return result.rows;
  }
}
