#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    .command("migrate:up", "migrate to latest version", {}, () => __awaiter(void 0, void 0, void 0, function* () {
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
    const { error, results } = yield migrator.migrateToLatest();
    results === null || results === void 0 ? void 0 : results.forEach((it) => {
        if (it.status === "Success") {
            console.log(`migration "${it.migrationName}" was executed successfully`);
        }
        else if (it.status === "Error") {
            console.error(`failed to execute migration "${it.migrationName}"`);
        }
    });
    if (error) {
        console.error("failed to migrate");
        console.error(error);
        process.exit(1);
    }
    yield db.destroy();
}))
    .command("migrate:down", "drop all migration", {}, () => __awaiter(void 0, void 0, void 0, function* () {
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
    const { error, results } = yield migrator.migrateTo(NO_MIGRATIONS);
    results === null || results === void 0 ? void 0 : results.forEach((it) => {
        if (it.status === "Success") {
            console.log(`migration "${it.migrationName}" was executed successfully`);
        }
        else if (it.status === "Error") {
            console.error(`failed to execute migration "${it.migrationName}"`);
        }
    });
    if (error) {
        console.error("failed to migrate");
        console.error(error);
        process.exit(1);
    }
    yield db.destroy();
}))
    .help()
    .argv;
