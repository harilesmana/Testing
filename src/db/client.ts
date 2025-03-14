import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const pool = mysql.createPool({
  host: "localhost",
  user: "harry",
  password: "password",
  database: "chat_platform",
});

export const db = drizzle(pool, { schema, mode: "default" });
