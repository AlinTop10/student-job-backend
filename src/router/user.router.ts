import { Router } from "express";
import { updateProfile } from "../controllers/user.controller";

const user = Router();

user.patch("/update-profile", updateProfile);

export default user;