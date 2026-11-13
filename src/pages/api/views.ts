// View counter. One Redis key, incremented on POST, read on GET.
// Backed by the Upstash Redis integration on Vercel (KV_REST_API_URL / KV_REST_API_TOKEN).
// Without those env vars (local dev) it answers { views: null } and the status line shows a dash.
import type { APIRoute } from "astro";

export const prerender = false;

const KEY = "views:site";

function store() {
  const url = import.meta.env.KV_REST_API_URL || import.meta.env.UPSTASH_REDIS_REST_URL;
  const token = import.meta.env.KV_REST_API_TOKEN || import.meta.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(cmd: string[]): Promise<number | null> {
  const s = store();
  if (!s) return null;
  const res = await fetch(`${s.url}/${cmd.map(encodeURIComponent).join("/")}`, {
    headers: { Authorization: `Bearer ${s.token}` },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { result?: number | string | null };
  return data.result == null ? 0 : Number(data.result);
}

function reply(views: number | null) {
  return new Response(JSON.stringify({ views }), {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export const GET: APIRoute = async () => reply(await redis(["GET", KEY]));
export const POST: APIRoute = async () => reply(await redis(["INCR", KEY]));
