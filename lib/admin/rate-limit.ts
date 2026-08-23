// In-memory fixed-window rate limiter.
// Sufficient for a single-instance deployment (this app runs as one Railway
// service). If you ever scale to multiple instances, move this to Postgres
// or Redis — noted in docs/architecture.md.

type Bucket = { count: number; resetAt: number };

const globalForRl = globalThis as unknown as {
  rlBuckets?: Map<string, Bucket>;
};
const buckets = (globalForRl.rlBuckets ??= new Map<string, Bucket>());

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

// Periodically clear stale buckets so the map cannot grow unbounded.
if (buckets.size === 0) {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  }, 10 * 60 * 1000).unref?.();
}
