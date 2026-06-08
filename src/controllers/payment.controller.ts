import { Request, Response, NextFunction } from "express";
import paymentService from "../service/payment-service";

const createCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;

    const data = await paymentService.createCheckoutSession(token);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export { createCheckoutSession };