import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { db } from "~/server/planetscale";
import { algoliaClient, algoliaIndex } from "~/server/algoliasearch";
import { getAuth } from "@clerk/nextjs/server";

export const createTRPCContext = (opts: CreateNextContextOptions) => {
  const { req } = opts;

  const sesh = getAuth(req);

  const userId = sesh.userId;

  return {
    db,
    algoliaClient,
    algoliaIndex,
    userId,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      userId: ctx.userId,
    },
  });
});

export const privateProcedure = t.procedure.use(enforceUserIsAuthed);
