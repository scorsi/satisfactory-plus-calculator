import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { db } from "~/server/planetscale";
import { algoliaClient, algoliaIndex } from "~/server/algoliasearch";
import { createServerSideHelpers } from "@trpc/react-query/server";

export const generateServerSideHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { db, algoliaClient, algoliaIndex, userId: null },
    transformer: superjson,
  });
