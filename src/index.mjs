// Worker

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/durablish") {
      return await handleRequest(request, env.DURABLISH);
    }
    return new Response("not found", { status: 404 });
  },
};

async function handleRequest(request, namespace) {
  let id = namespace.idFromName("A");
  let obj = namespace.get(id);
  let resp = await obj.fetch(request.url);
  let count = await resp.text();

  return new Response("Durable Object 'A' count: " + count);
}

// Durable Object

export class DurableishCounter {
  constructor() {
    this.count = 0;
  }

  // Handle HTTP requests from clients.
  async fetch() {
    return new Response(++this.count);
  }
}
