import { cleanEnv, str, num, bool } from "envalid";
import dotenv from "dotenv";

dotenv.config();

const env = cleanEnv(process.env, {
  TELEGRAM_BOT_API_KEY: str(),
  EXPRESS_PORT: num({ default: 3000 }),
  APP_API_KEY: str(),
  CACHE_REQUESTS: bool({ default: false }),
  CACHE_TTL: num({ default: 3600 }),
  REDIS_HOST: str({
    default: "",
    desc: "Redis host (required if CACHE_REQUESTS is true)",
  }),
  REDIS_PORT: num({
    default: 6379,
    desc: "Redis port (required if CACHE_REQUESTS is true)",
  }),
  REDIS_PASSWORD: str({ default: "", desc: "Redis password (optional)" }),
  REDIS_DB: num({ default: 0, desc: "Redis database number (optional)" }),
});

if (env.CACHE_REQUESTS) {
  if (!env.REDIS_HOST) {
    throw new Error("REDIS_HOST is required when CACHE_REQUESTS is true");
  }
}

export default env;
