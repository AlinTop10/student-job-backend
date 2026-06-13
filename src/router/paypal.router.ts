import { Router } from "express";
import { createPayPalOrder, capturePayPalOrder } from "../controllers/paypal.controller";

const paypal = Router();

paypal.post("/create-order", createPayPalOrder);
paypal.post("/capture-order", capturePayPalOrder);

export default paypal;