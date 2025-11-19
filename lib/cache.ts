import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

// Ou pour Redis local :
// import { createClient } from 'redis';
// const redis = createClient({ url: 'redis://localhost:6379' });
// await redis.connect();

export class CacheService {
  private static readonly CACHE_TTL = 3600; // 1 heure

  static async get<T>(key: string): Promise<T | null> {
    try {
      const cached = await redis.get(key);
      return cached as T;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  static async set(key: string, value: any, ttl: number = this.CACHE_TTL): Promise<void> {
    try {
      await redis.setex(key, ttl, value);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  static async invalidate(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      console.error('Cache invalidation error:', error);
    }
  }
}