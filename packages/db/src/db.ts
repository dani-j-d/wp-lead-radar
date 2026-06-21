import Database from "better-sqlite3";

export const db = new Database("lead-radar.db");

db.exec(`
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  domain TEXT NOT NULL,

  issue_type TEXT NOT NULL,

  severity TEXT NOT NULL,

  summary TEXT NOT NULL,

  suggested_fix TEXT NOT NULL,

  discovered_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);