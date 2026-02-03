interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export function checkRateLimit(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 60000
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || entry.resetTime < now) {
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime
    });
    return {
      success: true,
      limit: maxAttempts,
      remaining: maxAttempts - 1,
      reset: resetTime
    };
  }

  if (entry.count >= maxAttempts) {
    return {
      success: false,
      limit: maxAttempts,
      remaining: 0,
      reset: entry.resetTime
    };
  }

  entry.count++;
  rateLimitStore.set(identifier, entry);

  return {
    success: true,
    limit: maxAttempts,
    remaining: maxAttempts - entry.count,
    reset: entry.resetTime
  };
}