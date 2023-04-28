import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { env } from "~/env";
import { type Building } from "~/models/building";
import { type Recipe, type RecipeIngredient } from "~/models/recipe";
import { type Item } from "~/models/item";

export type Database = {
  buildings: Building;
  items: Item;
  recipes: Recipe;
  recipeIngredients: RecipeIngredient;
}

export const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: env.PLANETSCALE_DATABASE_HOST,
    username: env.PLANETSCALE_DATABASE_USERNAME,
    password: env.PLANETSCALE_DATABASE_PASSWORD
  })
});

