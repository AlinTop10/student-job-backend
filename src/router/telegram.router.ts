import { Router } from "express";
import { telegramWebhook } from "../controllers/telegram.controller";

const telegram = Router();

telegram.post("/webhook", telegramWebhook);

export default telegram;