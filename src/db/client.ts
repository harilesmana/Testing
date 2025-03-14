import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const pool = mysql.createPool({
  host: "caboose.proxy.rlwy.net",
  port: 48742,
  user: "root",
  password: "nNMxtKOyAmItMqderaehvVLeqrEBJCDV",
  database: "railway",
});

export const db = drizzle(pool, { schema, mode: "default" });