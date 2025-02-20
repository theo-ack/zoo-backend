import { z } from "zod";
import { StaffModel } from "./models/staff.js";

export const GehegeSchema = z.object({
  id: z.number().optional(),
  groesse: z.number().optional(),
  instandhaltungskosten: z.number().optional(),
  name: z.string().optional(),
});

export type Gehege = z.infer<typeof GehegeSchema>;

export const AnimalSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  gehege_id: z.number().optional(),
  tierazt_id: z
    .number()
    .refine(async (val) => await StaffModel.getVetById(val), {
      message: "No Tierarzt on this id ",
    }),
});

export type Animal = z.infer<typeof AnimalSchema>;
