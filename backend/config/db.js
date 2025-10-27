import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: "./mydb.sqlite",
  driver: sqlite3.Database,
});

// ✅ Users table
await db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user',
    city TEXT,
    dob TEXT,
    gender TEXT,
    height TEXT,
    sign TEXT,
    education TEXT,
    lookingFor TEXT,
    crush TEXT,
    favPlace TEXT,
    images TEXT
  )
`);

// ✅ Cookies table
await db.exec(`
  CREATE TABLE IF NOT EXISTS cookies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    value TEXT,
    createdAt TEXT
  )
`);

export default db;
