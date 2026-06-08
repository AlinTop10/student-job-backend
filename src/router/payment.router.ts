import { Router } from "express";
import { createCheckoutSession } from "../controllers/payment.controller";

const payment = Router();

payment.post("/create-checkout-session", createCheckoutSession);

export default payment;