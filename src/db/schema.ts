import { mysqlTable, varchar, int, text, datetime, primaryKey } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  password: text("password").notNull(),
});

export const rooms = mysqlTable("rooms", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).unique().notNull(),
});

export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  roomId: int("room_id").notNull(),
  content: text("content").notNull(),
  timestamp: datetime("timestamp").default(sql`CURRENT_TIMESTAMP`).notNull(),
  editedAt: datetime("edited_at"),
});
