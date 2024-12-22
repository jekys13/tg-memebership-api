import Redis from "ioredis";
import env from "../../utils/config";
import logger, { handleError } from "../../utils/logger";

let redisClient: Redis | null = null;

if (env.CACHE_REQUESTS) {
  redisClient = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD || undefined,
    db: env.REDIS_DB,
  });

  redisClient.on("connect", () => {
    logger.info("Connected to Redis");
  });

  redisClient.on("error", (err) => {
    handleError(err, "Redis connection error");
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
