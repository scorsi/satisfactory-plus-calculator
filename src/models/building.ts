import { z } from "zod";

export const buildingTypes = ["production", "power", "storage"] as const;

export const buildingSchema = z.object({
  id: z.string().nonempty(),
  type: z.enum(buildingTypes),
});

export type Building = z.infer<typeof buildingSchema>;
