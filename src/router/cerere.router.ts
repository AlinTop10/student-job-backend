import { Router } from "express";
import { createCerere } from "../controllers/cerere.controller";

const cerere = Router();

cerere.post('/create', createCerere);

export default cerere