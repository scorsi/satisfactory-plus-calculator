#!/usr/bin/env node

import yargs from "yargs/yargs";
import dotenv from "dotenv";
import * as url from "node:url";
import * as path from "node:path";
import { promises as fs } from "node:fs";
import { Migrator, FileMigrationProvider, Kysely, NO_MIGRATIONS } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

const rootDir = path.join(url.fileURLToPath(new URL(".", import.meta.url)), "..");

dotenv.config({
  path: path.join(rootDir, ".env")
});

void yargs(process.argv.slice(2))
  .usage("$0 <cmd> [args]")
  .scriptName("migrator")
  .command("migrate:up", "migrate to latest version", {}, async () => {
    const db = new Kysely({
      dialect: new PlanetScaleDialect({
        host: process.env.PLANETSCALE_DATABASE_HOST,
        username: process.env.PLANETSCALE_DATABASE_USERNAME,
        password: process.env.PLANETSCALE_DATABASE_PASSWORD
      })
    });

    const migrator = new Migrator({
      db,
      provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.join(rootDir, "migrations")
      })
    });

    const { error, results } = await migrator.migrateToLatest();

    results?.forEach((it) => {
      if (it.status === "Success") {
        console.log(`migration "${it.migrationName}" was executed successfully`);
      } else if (it.status === "Error") {
        console.error(`failed to execute migration "${it.migrationName}"`);
      }
    });

    if (error) {
      console.error("failed to migrate");
      console.error(error);
      process.exit(1);
    }

    await db.destroy();
  })
  .command("migrate:down", "drop all migration", {}, async () => {
    const db = new Kysely({
      dialect: new PlanetScaleDialect({
        host: process.env.PLANETSCALE_DATABASE_HOST,
        username: process.env.PLANETSCALE_DATABASE_USERNAME,
        password: process.env.PLANETSCALE_DATABASE_PASSWORD
      })
    });

    const migrator = new Migrator({
      db,
      provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.join(rootDir, "migrations")
      })
    });

      const { error, results } = await migrator.migrateTo(NO_MIGRATIONS);

      results?.forEach((it) => {
        if (it.status === "Success") {
          console.log(`migration "${it.migrationName}" was executed successfully`);
        } else if (it.status === "Error") {
          console.error(`failed to execute migration "${it.migrationName}"`);
        }
      });

      if (error) {
        console.error("failed to migrate");
        console.error(error);
        process.exit(1);
      }

      await db.destroy();
  })
  .help()
  .argv;
