import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { buildingSchema } from "~/models/building";
import { TRPCError } from "@trpc/server";
import { toCapitalizedSpaceCase, toKebabCase } from "~/utils/string-utils";

export const buildingsRouter = createTRPCRouter({
  getById: publicProcedure
    .input(buildingSchema.pick({ id: true }))
    .output(buildingSchema)
    .query(async ({ ctx: { db }, input: { id } }) => {
      const building = await db
        .selectFrom("buildings")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirst();

      if (!building) throw new TRPCError({ code: "NOT_FOUND" });

      return building;
    }),
  getAll: publicProcedure
    .input(z.undefined())
    .output(z.array(buildingSchema))
    .query(async ({ ctx: { db } }) => {
      return await db
        .selectFrom("buildings")
        .selectAll()
        .execute();
    }),
  create: publicProcedure
    .input(buildingSchema)
    .output(buildingSchema)
    .mutation(async ({ ctx: { db, algoliaIndex }, input }) => {
      const newBuilding = { ...input, id: toKebabCase(input.id) };

      await Promise.all([
        db
          .insertInto("buildings")
          .values(newBuilding)
          .execute(),
        algoliaIndex
          .saveObject({ objectID: newBuilding.id, name: toCapitalizedSpaceCase(newBuilding.id), type: newBuilding.type })
      ]);

      return newBuilding;
    })
});
