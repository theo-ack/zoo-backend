import { HTTPException } from "hono/http-exception";
import { getPool } from "../db/db.js";

export class StaffModel {
  static async findAll() {
    const result = await getPool().query(
      `SELECT personal.beruf_id, beruf.bezeichnung FROM personal JOIN beruf ON  personal.beruf_id = beruf_id;`
    );
    if (result.rowCount === 0) {
      throw new HTTPException(404, {
        message: "No Staff found",
      });
    }
    return result.rows;
  }

  static async getFreeVets() {
    const result = await getPool().query(
      `SELECT personal.id, COUNT(*) 
      FROM personal JOIN beruf ON personal.beruf_id = beruf.id 
      JOIN tier ON tier.tierazt_id = personal.id 
      WHERE beruf.bezeichnung = 'Tierarzt' 
      GROUP BY personal.id;`
    );
    if (result.rowCount === 0) {
      throw new HTTPException(404, {
        message: "No Staff found",
      });
    }
    return result.rows;
  }

  static async getVetById(id: number) {
    const result = await getPool().query(
      `
        SELECT * FROM personal Join beruf ON 
         personal.beruf_id = beruf.id WHERE personal.id = $1 AND beruf.bezeichnung = 'Tierarzt' `,
      [id]
    );

    if (result.rows.length === 0) {
      return false;
    } else {
      return true;
    }
  }
}
