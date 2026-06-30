import { Request, Response,  NextFunction } from "express";
import userService from '../service/user-service';

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idUser, nume, telefon } = req.body;

    const data = await userService.updateProfile(Number(idUser), nume, telefon);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export { updateProfile };