import { Request, Response, NextFunction } from "express";
import paymentService from "../service/payment-service";

const createCheckoutSession = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, studentData  } = req.body;
    const data = await paymentService.createCheckoutSession(token, studentData );

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const confirmPayment = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const { sessionId } = req.body;

    const data = await paymentService.confirmPayment(sessionId);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export { createCheckoutSession, confirmPayment };