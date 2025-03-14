import { Elysia } from "elysia";
import { db } from "../db/client";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const authRoutes = new Elysia()
  .post("/register", async ({ body, set, cookie }) => {
    const { username, password } = body;
    if (!username || !password) {
      set.status = 400;
      return { error: "Username dan password wajib diisi!" };
    }

    const existingUser = await db.select().from(users).where(eq(users.username, username));
    if (existingUser.length > 0) {
      set.status = 400;
      return { error: "Username sudah digunakan!" };
    }

    await db.insert(users).values({ username, password });

    // Simpan sesi & redirect ke halaman room
    cookie["session"] = username;
    set.status = 302;
    set.headers.Location = "/room";
    return;
  })

  .post("/login", async ({ body, set, cookie }) => {
    const { username, password } = body;
    const user = await db.select().from(users).where(eq(users.username, username)).limit(1);

    if (user.length === 0 || user[0].password !== password) {
      set.status = 401;
      return { error: "Username atau password salah!" };
    }

    // Simpan sesi & redirect ke halaman room
    cookie["session"] = username;
    set.status = 302;
    set.headers.Location = "/room";
    return;
  });