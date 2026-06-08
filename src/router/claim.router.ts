import { Router } from "express";
import { getClaimByToken } from "../controllers/claim.controller";

const claim = Router();

claim.get("/:token", getClaimByToken);

export default claim;