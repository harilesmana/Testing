import { Elysia } from "elysia";
import { db } from "../db/client";
import { messages } from "../db/schema";

export const chatRoutes = new Elysia()
  .post("/send-message", async ({ body, set }) => {
    const { userId, roomId, content } = body;
    if (!userId || !roomId || !content) {
      set.status = 400;
      return { error: "Semua field harus diisi!" };
    }

    await db.insert(messages).values({ userId, roomId, content });

    return { success: true };
  })

  .get("/messages/:roomId", async ({ params }) => {
    return await db.select().from(messages).where(messages.roomId.eq(params.roomId));
  });