import { Request, Response, NextFunction } from "express";
import claimService from "../service/claim-service";

const getClaimByToken = async (
    req: Request<{ token: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { token } = req.params;

        const data = await claimService.getByToken(token);

        return res.json(data);
    } catch (error) {
        next(error);
    }
};

export { getClaimByToken };