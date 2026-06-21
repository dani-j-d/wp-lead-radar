import "server-only";
import Database from "better-sqlite3";
import path from "path";

const db = new Database(
  path.resolve(process.cwd(), "lead-radar.db")
);

db.exec(`
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  domain TEXT NOT NULL,
  issue_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  summary TEXT NOT NULL,
  suggested_fix TEXT NOT NULL,
  discovered_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

export function createLead(lead: {
  domain: string;
  issue_type: string;
  severity: string;
  summary: string;
  suggested_fix: string;
}) {
  return db.prepare(`
    INSERT INTO leads (
      domain,
      issue_type,
      severity,
      summary,
      suggested_fix
    ) VALUES (?, ?, ?, ?, ?)
  `).run(
    lead.domain,
    lead.issue_type,
    lead.severity,
    lead.summary,
    lead.suggested_fix
  );
}

export function getLeads() {
  return db.prepare(`
    SELECT * FROM leads ORDER BY id DESC
  `).all();
}