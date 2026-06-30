import { Request, Response, NextFunction } from "express";
import cerereService from "../service/cerere-service";


const createCerere = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const cerere = await cerereService.create(req.body);
        return res.json(cerere);
    } catch (error) {
        next(error);
    
    }
}

const getUserCereri = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { idUser } = req.params;

        const cereri =
            await cerereService.getByUser(Number(idUser));

        return res.json(cereri);

    } catch (error) {
        next(error);
    }
}

const cancelCerere = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idCerere, idUser } = req.body;

    const data = await cerereService.cancel(Number(idCerere), Number(idUser));

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export { createCerere, getUserCereri, cancelCerere };