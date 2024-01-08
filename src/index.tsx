import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import * as elements from 'typed-html';
import { staticPlugin } from '@elysiajs/static';
import { cors } from '@elysiajs/cors';

const app = new Elysia()
.use(cors())
  .use(html())
  .use(staticPlugin({
    root: 'public'
  }))
  .get('/', () => { return Bun.file('public/index.html') })
  .listen(3000);
console.log(`Elysia running on ${app.server?.hostname}:${app.server?.port}`);
