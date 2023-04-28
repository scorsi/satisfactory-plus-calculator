import { createTRPCRouter } from "~/server/api/trpc";
import { itemsRouter } from "~/server/api/routers/items";

export const appRouter = createTRPCRouter({
  items: itemsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
