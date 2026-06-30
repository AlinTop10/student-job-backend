import { Request, Response, NextFunction } from "express";
import cerereService from "../service/cerere-service";
import telegramService from "../service/telegram-service";

const telegramWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body;

    const callbackQuery = update.callback_query;

    if (!callbackQuery) {
      return res.sendStatus(200);
    }

    const callbackData = callbackQuery.data;
    const callbackQueryId = callbackQuery.id;

    if (callbackData?.startsWith("publish_")) {
      const idCerere = Number(callbackData.replace("publish_", ""));

      await cerereService.approve(idCerere);

      await telegramService.answerCallbackQuery(
        callbackQueryId,
        "Cererea a fost publicată."
      );
    }

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export { telegramWebhook };