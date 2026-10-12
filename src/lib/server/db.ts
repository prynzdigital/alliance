import "server-only";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { SCHEMA_STATEMENTS } from "./schema";
import { seedDatabase } from "./seed";

export type Row = Record<string, unknown>;
type Executor = (text: string, params: unknown[]) => Promise<Row[]>;

// Production reads from Neon (Vercel's Storage tab → Postgres injects
// DATABASE_URL; POSTGRES_URL is the older name). In local development with no
// DATABASE_URL, an embedded Postgres (PGlite) stored in .data/ stands in so the
// admin can be exercised end to end without a cloud database. Production with
// no database configured returns null, and the public site falls back to the
// built-in default content.
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

export function isDatabaseConfigured(): boolean {
  return Boolean(connectionString) || process.env.NODE_ENV !== "production";
}

export function databaseMode(): "neon" | "local" | "none" {
  if (connectionString) return "neon";
  return process.env.NODE_ENV !== "production" ? "local" : "none";
}

// Cached on globalThis so dev-server hot reloads reuse one connection (PGlite
// holds a lock on its data directory) instead of opening a new one per edit.
const globalForDb = globalThis as unknown as {
  __socExecutor?: Promise<Executor | null>;
  __socSchemaReady?: Promise<void>;
};

async function createExecutor(): Promise<Executor | null> {
  if (connectionString) {
    const { neon } = await import("@neondatabase/serverless");
    const client = neon(connectionString);
    return async (text, params) => (await client.query(text, params)) as Row[];
  }
  if (process.env.NODE_ENV !== "production") {
    const { PGlite } = await import("@electric-sql/pglite");
    const dataDir = path.join(process.cwd(), ".data", "pglite");
    await mkdir(dataDir, { recursive: true });
    const db = new PGlite(dataDir);
    await db.waitReady;
    return async (text, params) => (await db.query<Row>(text, params)).rows;
  }
  return null;
}

function getExecutor(): Promise<Executor | null> {
  // A failed connection attempt isn't cached, so the next request retries.
  globalForDb.__socExecutor ??= createExecutor().catch((err) => {
    globalForDb.__socExecutor = undefined;
    throw err;
  });
  return globalForDb.__socExecutor;
}

export class DatabaseUnavailableError extends Error {
  constructor() {
    super("No database is configured. Set DATABASE_URL to a Neon Postgres connection string.");
  }
}

/** Raw parameterized query ($1, $2, …). Column/table names must never come from user input. */
export async function query<T = Row>(text: string, params: unknown[] = []): Promise<T[]> {
  const exec = await getExecutor();
  if (!exec) throw new DatabaseUnavailableError();
  await ensureSchema();
  return (await exec(text, params)) as T[];
}

/** Tagged-template form: sql`SELECT * FROM x WHERE id = ${id}` — values are always parameterized. */
export function sql<T = Row>(strings: TemplateStringsArray, ...values: unknown[]): Promise<T[]> {
  const text = strings.reduce((acc, part, i) => acc + part + (i < values.length ? `$${i + 1}` : ""), "");
  return query<T>(text, values);
}

// Idempotent and cached per server instance, so it only touches the database
// once per cold start. Seeding runs once ever (tracked in the meta table), so
// deleting every event in the admin doesn't bring the defaults back.
export function ensureSchema(): Promise<void> {
  globalForDb.__socSchemaReady ??= (async () => {
    const exec = await getExecutor();
    if (!exec) throw new DatabaseUnavailableError();
    for (const statement of SCHEMA_STATEMENTS) await exec(statement, []);
    await seedDatabase(exec);
  })().catch((err) => {
    globalForDb.__socSchemaReady = undefined;
    throw err;
  });
  return globalForDb.__socSchemaReady;
}
