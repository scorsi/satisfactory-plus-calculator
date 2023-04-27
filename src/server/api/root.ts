import { createTRPCRouter } from "~/server/api/trpc";
import { buildingsRouter } from "~/server/api/routers/buildings";

export const appRouter = createTRPCRouter({
  buildings: buildingsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
