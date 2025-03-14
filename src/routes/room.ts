import { Elysia } from "elysia";
import { db } from "../db/client";
import { rooms } from "../db/schema";

export const roomRoutes = new Elysia()
  .post("/create-room", async ({ body, set }) => {
    const { roomName } = body;
    if (!roomName) {
      set.status = 400;
      return { error: "Nama room tidak boleh kosong!" };
    }

    const [room] = await db.insert(rooms).values({ name: roomName }).returning({ id: rooms.id });

    return { success: true, roomId: room.id };
  })

  .get("/rooms", async () => {
    return await db.select().from(rooms);
  });