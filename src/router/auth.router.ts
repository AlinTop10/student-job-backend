import { Router } from "express";
import {register} from '../controllers/auth.controller'
import { regValidator } from "../middleware/reg.middleware";


const auth = Router();

auth.post('/reg', regValidator, register);
auth.post('/login');
auth.post('/logout');
auth.get('/refresh');
auth.get('/activate/:link');
auth.get('/users');

export default auth;