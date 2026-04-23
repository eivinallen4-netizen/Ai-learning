import { createClient, Client } from "@libsql/client"

let db: Client | null = null
let migrationsStarted = false
let migrationsPromise: Promise<void> | null = null

export function getDb(): Client {
  if (db) return db

  const dbUrl = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN

  if (!dbUrl) {
    throw new Error("TURSO_DATABASE_URL not configured")
  }

  if (!authToken) {
    throw new Error("TURSO_AUTH_TOKEN not configured")
  }

  db = createClient({
    url: dbUrl,
    authToken,
  })

  // Auto-run migrations on first DB access (fire-and-forget)
  if (!migrationsStarted) {
    migrationsStarted = true
    migrationsPromise = runMigrations().catch((err) =>
      console.error("[Turso Migration Error]:", err)
    )
  }

  return db
}

// Async function to ensure migrations are complete before doing writes
export async function ensureMigrations(): Promise<void> {
  if (migrationsPromise) {
    await migrationsPromise
  } else if (!migrationsStarted) {
    getDb() // Trigger migrations
    if (migrationsPromise) {
      await migrationsPromise
    }
  }
}

const MIGRATIONS = [
  `CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    subject TEXT NOT NULL,
    mentor TEXT,
    created_at INTEGER NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS resources (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL,
    raw TEXT NOT NULL,
    important INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY(course_id) REFERENCES courses(id)
  )`,

  `CREATE TABLE IF NOT EXISTS tests (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL,
    FOREIGN KEY(course_id) REFERENCES courses(id)
  )`,

  `CREATE TABLE IF NOT EXISTS answers (
    id TEXT PRIMARY KEY,
    test_id TEXT NOT NULL,
    text TEXT NOT NULL,
    is_correct INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY(test_id) REFERENCES tests(id)
  )`,

  `CREATE TABLE IF NOT EXISTS progress (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    course_id TEXT NOT NULL,
    resource_index INTEGER NOT NULL DEFAULT 0,
    test_score REAL,
    updated_at INTEGER NOT NULL,
    FOREIGN KEY(course_id) REFERENCES courses(id)
  )`,
]

export async function runMigrations(): Promise<void> {
  const client = getDb()

  for (const migration of MIGRATIONS) {
    try {
      await client.execute(migration)
      console.log("[Turso] Migration executed:", migration.split("\n")[0])
    } catch (error) {
      // Table already exists — this is expected
      if (
        error instanceof Error &&
        error.message.includes("already exists")
      ) {
        continue
      }
      throw error
    }
  }

  console.log("[Turso] All migrations completed")
}
