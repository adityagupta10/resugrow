/**
 * In-memory sliding-window rate limiter.
 *
 * Per Vercel serverless instance — each instance keeps its own counters, so a
 * cold start resets quota. That is acceptable: the goal is to block sustained
 * single-IP abuse and runaway LLM costs, not to enforce a global SLA.
 *
 * For true global limits, swap the in-memory Map for Upstash/Vercel KV.
 */

const buckets = new Map();
const MAX_BUCKETS = 5000;

function pruneIfNeeded(now) {
  if (buckets.size <= MAX_BUCKETS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
    if (buckets.size <= MAX_BUCKETS * 0.8) break;
  }
}

export function getClientIp(request) {
  const headers = request.headers;
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const real = headers.get('x-real-ip');
  if (real) return real.trim();
  const vercel = headers.get('x-vercel-forwarded-for');
  if (vercel) return vercel.split(',')[0].trim();
  return 'unknown';
}

/**
 * Check whether a key (typically `${route}:${ip}`) is within its budget.
 * Returns { success, limit, remaining, reset } similar to upstash/ratelimit.
 */
export function rateLimit({ key, limit, windowMs }) {
  const now = Date.now();
  pruneIfNeeded(now);

  let bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }

  bucket.count += 1;
  const remaining = Math.max(0, limit - bucket.count);
  const success = bucket.count <= limit;

  return {
    success,
    limit,
    remaining,
    reset: bucket.resetAt,
  };
}

/**
 * Convenience wrapper for App Router POST handlers.
 * Usage:
 *   const limited = await enforceRateLimit(req, { route: 'ats-scan', limit: 10, windowMs: 60_000 });
 *   if (limited) return limited;
 */
export function enforceRateLimit(request, { route, limit, windowMs }) {
  const ip = getClientIp(request);
  const result = rateLimit({ key: `${route}:${ip}`, limit, windowMs });

  if (result.success) return null;

  const retryAfterSec = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));
  return new Response(
    JSON.stringify({
      error: 'Too many requests. Please slow down and try again shortly.',
      retryAfter: retryAfterSec,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfterSec),
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(Math.ceil(result.reset / 1000)),
      },
    }
  );
}
