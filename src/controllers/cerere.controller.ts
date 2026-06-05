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

export { createCerere };