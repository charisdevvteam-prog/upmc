import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

process.loadEnvFile?.(".env.local");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const sql = neon(url);
const statements = readFileSync("db/schema.sql", "utf8")
  .split(";")
  .map((statement) => statement.trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
}

console.log(`Applied ${statements.length} statements.`);
