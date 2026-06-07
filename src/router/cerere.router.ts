import { Router } from "express";
import { createCerere, getUserCereri } from "../controllers/cerere.controller";

const cerere = Router();

cerere.post('/create', createCerere);
cerere.get('/user/:idUser', getUserCereri);

export default cerere