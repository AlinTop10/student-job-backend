import { Router } from "express";
import { createCerere, getUserCereri, cancelCerere } from "../controllers/cerere.controller";

const cerere = Router();

cerere.post('/create', createCerere);
cerere.get('/user/:idUser', getUserCereri);
cerere.patch("/cancel", cancelCerere);

export default cerere