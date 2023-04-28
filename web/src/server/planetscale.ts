import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { env } from "~/env";
import { type Recipe } from "~/models/recipe";
import { type Item } from "~/models/item";

export type Database = {
  items: Item;
  recipes: Recipe;
}

export const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: env.PLANETSCALE_DATABASE_HOST,
    username: env.PLANETSCALE_DATABASE_USERNAME,
    password: env.PLANETSCALE_DATABASE_PASSWORD
  })
});

