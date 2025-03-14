import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    host: "caboose.proxy.rlwy.net",
    port: 48742,
    user: "root",
    password: "nNMxtKOyAmItMqderaehvVLeqrEBJCDV",
    database: "railway",
  },
});