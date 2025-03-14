import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    host: "localhost",
    user: "harry",
    password: "password",
    database: "chat_platform",
  },
});
