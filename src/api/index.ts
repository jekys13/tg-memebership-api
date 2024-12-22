import express, { Request, Response, NextFunction } from "express";
import { isUserInGroup } from "../services/telegram/bot";
import { handleError } from "../utils/logger";
import { getCache, setCache } from "../services/cache/redis";
import env from "../utils/config";

const app = express();

app.use(express.json());

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];

  if (!env.APP_API_KEY) {
    return next();
  }

  if (!apiKey || apiKey !== env.APP_API_KEY) {
    res.status(403).json({ error: "Forbidden: Invalid API Key" });
    return;
  }

  next();
};

app.get("/check", authenticate, async (req: Request, res: Response) => {
  const { userId, chatId } = req.query;

  if (!userId || !chatId) {
    res.status(400).json({ error: "Missing userId or chatId" });
    return;
  }

  const cacheKey = `check:${userId}:${chatId}`;

  try {
    const cachedResult = await getCache(cacheKey);

    if (cachedResult !== null) {
      res.json({ userId, chatId, isInGroup: cachedResult });
      return;
    }

    const isInGroup = await isUserInGroup(Number(userId), String(chatId));
    await setCache(cacheKey, isInGroup);

    res.json({ userId, chatId, isInGroup });
  } catch (error) {
    handleError(error, "API error in /check");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default app;
