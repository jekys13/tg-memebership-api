import express, { Request, Response } from "express";
import { isUserInGroup } from "../services/telegram/bot";
import { handleError } from "../utils/logger";

const app = express();

app.use(express.json());

app.get("/check", async (req: Request, res: Response) => {
  const { userId, chatId } = req.query;

  if (!userId || !chatId) {
    res.status(400).json({ error: "Missing userId or chatId" });
    return;
  }

  try {
    const isInGroup = await isUserInGroup(Number(userId), String(chatId));
    res.json({ userId, chatId, isInGroup });
  } catch (error) {
    handleError(error, "API error in /check");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default app;
