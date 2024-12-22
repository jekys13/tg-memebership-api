import Redis from "ioredis";
import env from "../../utils/config";

let redisClient: Redis | null = null;

if (env.CACHE_REQUESTS) {
  redisClient = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD || undefined,
    db: env.REDIS_DB,
  });

  redisClient.on("connect", () => {
    console.log("Connected to Redis");
  });

  redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
  });
}

export const setCache = async (
  key: string,
  value: any,
  ttl: number = env.CACHE_TTL
) => {
  if (!redisClient) return;
  await redisClient.set(key, JSON.stringify(value), "EX", ttl);
};

export const getCache = async (key: string): Promise<any | null> => {
  if (!redisClient) return null;
  const value = await redisClient.get(key);
  return value ? JSON.parse(value) : null;
};

export { redisClient };
