import { z } from "zod";

export const recipeSchema = z.object({
  id: z.string().nonempty(),
  alternative: z.boolean(),
  buildingId: z.string().nonempty(),
  inputs: z.array(z.object({
    itemId: z.string().nonempty(),
    amount: z.number(),
  })),
  outputs: z.array(z.object({
    itemId: z.string().nonempty(),
    amount: z.number(),
  })),
  cycle: z.number()
});

export type Recipe = z.infer<typeof recipeSchema>;
