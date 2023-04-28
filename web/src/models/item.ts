import { z } from "zod";

export const itemSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  categories: z.object({
    "0": z.string().nonempty()
  }),
  produced_in: z.array(z.string().nonempty()),
  consumed_in: z.array(z.string().nonempty())
});

export type Item = z.infer<typeof itemSchema>;
