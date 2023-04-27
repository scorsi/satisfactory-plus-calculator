/**
 * @param db {import("kysely").Kysely<unknown>}
 * @return {Promise<void>}
 */
export async function up(db) {
  await db.schema
    .createTable("buildings")
    .addColumn("id", "varchar(255)", (col) => col.primaryKey())
    .addColumn("type", "varchar(255)", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("items")
    .addColumn("id", "varchar(255)", (col) => col.primaryKey())
    .addColumn("natural", "boolean", (col) => col.notNull())
    .addColumn("type", "varchar(255)", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("recipes")
    .addColumn("id", "varchar(255)", (col) => col.primaryKey())
    .addColumn("buildingId", "varchar(255)", (col) => col.notNull())
    .addColumn("cycle", "numeric", (col) => col.notNull())
    .addColumn("alternative", "boolean", (col) => col.notNull())
    .addColumn("input", "json", (col) => col.notNull())
    .addColumn("output", "json", (col) => col.notNull())
    .execute();
}

/**
 * @param db {import("kysely").Kysely<unknown>}
 * @return {Promise<void>}
 */
export async function down(db) {
  await db.schema.dropTable("recipes").execute();
  await db.schema.dropTable("items").execute();
  await db.schema.dropTable("buildings").execute();
}