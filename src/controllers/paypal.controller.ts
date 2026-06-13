import { Request, Response, NextFunction } from "express";
import paypalService from "../service/paypal-service";

const createPayPalOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, studentData } = req.body;

    const order = await paypalService.createOrder(token, studentData);

    return res.json(order);
  } catch (error) {
    next(error);
  }
};

const capturePayPalOrder = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const { orderID } = req.body;

    const data = await paypalService.captureOrder(orderID);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export { createPayPalOrder, capturePayPalOrder };