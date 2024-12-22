import { Telegraf } from "telegraf";
import env from "../../utils/config";
import { handleError } from "../../utils/logger";

const bot = new Telegraf(env.TELEGRAM_BOT_API_KEY);

export const isUserInGroup = async (
  userId: number,
  chatIdOrUsername: string | number
): Promise<boolean> => {
  try {
    const chatMember = await bot.telegram.getChatMember(
      chatIdOrUsername,
      userId
    );
    return chatMember.status !== "left" && chatMember.status !== "kicked";
  } catch (error) {
    handleError(error, "Error checking user in group");
    return false;
  }
};

export const getChatId = async (username: string): Promise<number | null> => {
  try {
    const chat = await bot.telegram.getChat(username);
    return chat.id;
  } catch (error) {
    handleError(error, "Error fetching chat info");
    return null;
  }
};
