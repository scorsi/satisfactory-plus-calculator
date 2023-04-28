import { z } from "zod";

export const itemSchema = z.object({
  id: z.string().nonempty(),
  natural: z.boolean(),
  type: z.enum(["solid", "fluid"]),
});

export type Item = z.infer<typeof itemSchema>;
