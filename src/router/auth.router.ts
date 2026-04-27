import { Router } from "express";
import {register, activate, login, logout, refresh} from '../controllers/auth.controller'
import { regValidator } from "../middleware/reg.middleware";


const auth = Router();

auth.post('/reg', regValidator, register);
auth.post('/logi', login);
auth.post('/logo', logout);
auth.get('/refresh', refresh);
auth.get('/activate/:link', activate);

export default auth;