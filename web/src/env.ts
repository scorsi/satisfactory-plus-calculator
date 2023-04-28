import { z } from "zod";

const server = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  PLANETSCALE_DATABASE_HOST: z.string().nonempty(),
  PLANETSCALE_DATABASE_USERNAME: z.string().nonempty(),
  PLANETSCALE_DATABASE_PASSWORD: z.string().nonempty(),
  UPSTASH_REDIS_REST_URL: z.string().nonempty(),
  UPSTASH_REDIS_REST_TOKEN: z.string().nonempty(),
  CLERK_SECRET_KEY: z.string().nonempty(),
  ALGOLIA_ADMIN_API_KEY: z.string().nonempty(),
});

const client = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().nonempty(),
  NEXT_PUBLIC_ALGOLIA_APP_ID: z.string().nonempty(),
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: z.string().nonempty(),
} satisfies Record<`NEXT_PUBLIC_${string}`, z.ZodType>);

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  PLANETSCALE_DATABASE_HOST: process.env.PLANETSCALE_DATABASE_HOST,
  PLANETSCALE_DATABASE_USERNAME: process.env.PLANETSCALE_DATABASE_USERNAME,
  PLANETSCALE_DATABASE_PASSWORD: process.env.PLANETSCALE_DATABASE_PASSWORD,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  ALGOLIA_ADMIN_API_KEY: process.env.ALGOLIA_ADMIN_API_KEY,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
};

const isServer = typeof window === "undefined";

const parsed =
  isServer
    ? server.merge(client).safeParse(processEnv)
    : client.safeParse(processEnv);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

const env = new Proxy(parsed.data, {
  get(target, prop) {
    if (typeof prop !== "string") return undefined;
    if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
      throw new Error(
        process.env.NODE_ENV === "production"
          ? "❌ Attempted to access a server-side environment variable on the client"
          : `❌ Attempted to access server-side environment variable '${prop}' on the client`
      );
    return target[prop as keyof typeof target];
  }
}) as z.infer<typeof server & typeof client>;

export { env };
