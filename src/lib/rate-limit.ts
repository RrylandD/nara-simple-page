import { LRUCache } from 'lru-cache';
import type { NextApiResponse } from 'next';

export interface RateLimitOptions {
  interval: number;
  uniqueTokenPerInterval: number;
}

export interface RateLimitResult {
  check: (res: NextApiResponse, limit: number, token: string) => Promise<void>;
}

export function rateLimit(options: RateLimitOptions): RateLimitResult {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  });

  return {
    check: async (res: NextApiResponse, limit: number, token: string): Promise<void> => {
      const tokenCount = tokenCache.get(token) as number[] | undefined;
      const newCount = tokenCount ? tokenCount[0]! + 1 : 1;
      
      if (!tokenCount) {
        tokenCache.set(token, [newCount]);
      } else {
        tokenCount[0] = newCount;
      }

      const isRateLimited = newCount > limit;

      res.setHeader('X-RateLimit-Limit', limit);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - newCount));

      if (isRateLimited) {
        throw new Error('Rate limit exceeded');
      }
    },
  };
} 