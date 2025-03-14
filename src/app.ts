import { Elysia } from "elysia";
import { authRoutes } from "./routes/auth";
import { roomRoutes } from "./routes/room";
import { chatRoutes } from "./routes/chat";
import { renderFile } from "ejs";
import { join } from "path";
import { cookie } from "@elysiajs/cookie";

const app = new Elysia()
  .use(cookie())

  // Halaman utama (Login / Register)
  .get("/", async () => {
    return new Response(await renderFile(join(__dirname, "views", "index.ejs")), {
      headers: { "Content-Type": "text/html" },
    });
  })

  // Halaman room setelah login
  .get("/room", async ({ cookie, set }) => {
    if (!cookie.session) {
      set.status = 302;
      set.headers.Location = "/";
      return;
    }

    return new Response(await renderFile(join(__dirname, "views", "room.ejs"), { username: cookie.session }), {
      headers: { "Content-Type": "text/html" },
    });
  })

  // Halaman chat room
  .get("/chat/:roomId", async ({ params, cookie, set }) => {
    if (!cookie.session) {
      set.status = 302;
      set.headers.Location = "/";
      return;
    }

    return new Response(
      await renderFile(join(__dirname, "views", "chat.ejs"), {
        roomId: params.roomId,
        username: cookie.session,
      }),
      { headers: { "Content-Type": "text/html" } }
    );
  })

  .use(authRoutes)
  .use(roomRoutes)
  .use(chatRoutes)
  .listen(3000);

console.log("Server running on http://localhost:3000");