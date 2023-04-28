import { z } from "zod";

export const recipeSchema = z.object({
  id: z.string().nonempty(),
  schematic_id: z.string().nonempty(),
  name: z.string().nonempty(),
  categories: z.object({ "0": z.string().nonempty(), "1": z.string().nonempty() }),
  ingredients: z.array(z.object({
    item_id: z.string().nonempty(),
    amount: z.number(),
    manual_rate: z.number(),
    factory_rate: z.number()
  })),
  products: z.array(z.object({
    item_id: z.string().nonempty(),
    amount: z.number(),
    manual_rate: z.number(),
    factory_rate: z.number()
  })),
  buildings: z.array(z.string().nonempty()),
  duration: (z.object({
    manual: z.number(),
    manufacturing: z.number()
  }))
});

export type Recipe = z.infer<typeof recipeSchema>;
