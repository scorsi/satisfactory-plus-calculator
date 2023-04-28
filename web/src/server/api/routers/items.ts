import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { itemSchema } from "~/models/item";

export const itemsRouter = createTRPCRouter({
  getById: publicProcedure
    .input(itemSchema.pick({ id: true }))
    .output(itemSchema)
    .query(async ({ ctx: { db }, input: { id } }) => {
      const item = await db
        .selectFrom("items")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirst();

      if (!item) throw new TRPCError({ code: "NOT_FOUND" });

      return item;
    }),
  getAll: publicProcedure
    .input(z.undefined())
    .output(z.array(itemSchema))
    .query(async ({ ctx: { db } }) => {
      return await db
        .selectFrom("items")
        .selectAll()
        .execute();
    })
});
