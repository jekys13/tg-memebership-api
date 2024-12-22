import { cleanEnv, str, num } from "envalid";
import dotenv from "dotenv";

dotenv.config();

const env = cleanEnv(process.env, {
  TELEGRAM_BOT_API_KEY: str(),
  EXPRESS_PORT: num({ default: 3000 }),
});

export default env;
