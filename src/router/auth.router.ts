import { Router } from "express";
import {register, activate, login} from '../controllers/auth.controller'
import { regValidator } from "../middleware/reg.middleware";


const auth = Router();

auth.post('/reg', regValidator, register);
auth.post('/logi', login);
// auth.post('/logout');
// auth.get('/refresh');
auth.get('/activate/:link', activate);
// auth.get('/users');

export default auth;