import { Elysia, ws } from "elysia";
import { db } from "../db/client";
import { messages } from "../db/schema";
import { eq } from "drizzle-orm";

export const chatRoutes = new Elysia()
  .ws("/chat/:roomId", {
    open(ws) {
      console.log("User connected to chatroom");
    },

    message(ws, data) {
      const { roomId, userId, content } = data;
      if (!content) return;

      db.insert(messages).values({ roomId, userId, content });
      ws.send(JSON.stringify({ userId, content }));
    },

    close(ws) {
      console.log("User disconnected");
    },
  })

  .put("/messages/:messageId", async ({ params, body, set }) => {
    const { messageId } = params;
    const { userId, content } = body;

    await db
      .update(messages)
      .set({ content, editedAt: new Date() })
      .where(eq(messages.id, messageId));

    return { success: true, message: "Pesan berhasil diperbarui!" };
  })

  .delete("/messages/:messageId", async ({ params, body, set }) => {
    const { messageId } = params;
    const { userId } = body;

    await db.delete(messages).where(eq(messages.id, messageId));
    return { success: true, message: "Pesan berhasil dihapus!" };
  });
