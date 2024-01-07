import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";
import { staticPlugin } from "@elysiajs/static";

const app = new Elysia()

  .use(html())
  .use(staticPlugin())
  .get("/", () => (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="module" src="/public/dist/js/client.js" defer></script>
        <script
          src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.3/dist/cdn.min.js"
          defer
        ></script>
        <link href="/public/dist/css/styles.css" rel="stylesheet"></link>
      </head>
      <body>
        <h1>SNAKE!</h1>
        <h2 id="score">
          Score:<span>0</span>
        </h2>
        <canvas id="my-canvas" width="400" height="400"></canvas>
      </body>
    </html>
  ))
  .listen(3000);
console.log(`Elysia running on ${app.server?.hostname}:${app.server?.port}`);
