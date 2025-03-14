import { Elysia } from "elysia";
import { db } from "../db/client";
import { rooms } from "../db/schema";

export const roomRoutes = new Elysia()
  .get("/rooms", async () => {
    return await db.select().from(rooms);
  })

  .post("/rooms", async ({ body, set }) => {
    const { name } = body;
    if (!name) {
      set.status = 400;
      return { error: "Nama room wajib diisi!" };
    }

    await db.insert(rooms).values({ name });
    return { success: true, message: "Room berhasil dibuat!" };
  });
