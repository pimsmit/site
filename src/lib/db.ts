import { createClient, type Client } from "@libsql/client";

let dbPromise: Promise<Client> | null = null;

async function ensureSchema(db: Client) {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      status TEXT DEFAULT 'new',
      company TEXT NOT NULL,
      contact TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      found_via TEXT,
      project_type TEXT NOT NULL,
      description TEXT NOT NULL,
      timeline TEXT NOT NULL,
      budget TEXT,
      target_audience TEXT,
      existing_url TEXT,
      needs_credentials INTEGER DEFAULT 0,
      tech_stack TEXT,
      features TEXT,
      design_prefs TEXT,
      references_text TEXT,
      files TEXT DEFAULT '[]',
      drive_folder_url TEXT,
      admin_title TEXT,
      admin_brief TEXT,
      admin_deliverables TEXT,
      admin_tech_requirements TEXT,
      admin_design_assets_link TEXT,
      admin_repo_link TEXT,
      builder_fee TEXT,
      deadline TEXT,
      difficulty TEXT,
      priority TEXT DEFAULT 'normal',
      assigned_to TEXT,
      discord_message_id TEXT,
      estimate_total REAL,
      estimate_hours REAL,
      created_at TEXT DEFAULT (datetime('now')),
      published_at TEXT,
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);
}

export async function getDb(): Promise<Client> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const url = process.env.TURSO_DATABASE_URL?.trim();
      const authToken = process.env.TURSO_AUTH_TOKEN?.trim();

      if (!url || !authToken) {
        throw new Error("Missing Turso configuration");
      }

      const db = createClient({ url, authToken });
      await ensureSchema(db);
      return db;
    })();
  }

  return dbPromise;
}
