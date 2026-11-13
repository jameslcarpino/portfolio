// Leaderboard for lord_boogers_house_of_horrors.exe: fastest wins, arcade style.
// One Redis sorted set (score = seconds). Same Upstash env vars as views.ts.
// Without them (local dev) GET answers { scores: null } and POST is a no-op.
import type { APIRoute } from "astro";

export const prerender = false;

const KEY = "scores:boogers";
const TOP = 20;

function store() {
  const url = import.meta.env.KV_REST_API_URL || import.meta.env.UPSTASH_REDIS_REST_URL;
  const token = import.meta.env.KV_REST_API_TOKEN || import.meta.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(cmd: (string | number)[]): Promise<unknown> {
  const s = store();
  if (!s) return null;
  const res = await fetch(`${s.url}/${cmd.map((c) => encodeURIComponent(String(c))).join("/")}`, {
    headers: { Authorization: `Bearer ${s.token}` },
  });
  if (!res.ok) return null;
  return ((await res.json()) as { result?: unknown }).result ?? null;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export const GET: APIRoute = async () => {
  if (!store()) return json({ scores: null });
  const raw = (await redis(["ZRANGE", KEY, 0, TOP - 1, "WITHSCORES"])) as string[] | null;
  if (!raw) return json({ scores: [] });
  const scores: { name: string; seconds: number }[] = [];
  for (let i = 0; i < raw.length; i += 2) scores.push({ name: raw[i].split("#")[0], seconds: Number(raw[i + 1]) });
  return json({ scores });
};

export const POST: APIRoute = async ({ request }) => {
  let body: { name?: unknown; seconds?: unknown } = {};
  try { body = await request.json(); } catch {}
  const name = String(body.name ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 3);
  const seconds = Math.round(Number(body.seconds));
  // a human cannot win in under a minute; nobody plays for a day
  if (name.length < 1 || !Number.isFinite(seconds) || seconds < 60 || seconds > 86400) return json({ ok: false }, 400);
  if (!store()) return json({ ok: false, offline: true });
  await redis(["ZADD", KEY, seconds, `${name}#${Date.now()}`]);
  await redis(["ZREMRANGEBYRANK", KEY, 100, -1]);
  return json({ ok: true });
};
