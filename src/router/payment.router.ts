import { Router } from "express";
import { createCheckoutSession, confirmPayment } from "../controllers/payment.controller";

const payment = Router();

payment.post("/create-checkout-session", createCheckoutSession);
payment.post("/confirm", confirmPayment);

export default payment;