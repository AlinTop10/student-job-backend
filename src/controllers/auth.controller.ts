import { Request, Response,  NextFunction } from "express";
import { User } from "../models/user_model";
import { error } from "node:console";
import bcrypt from "bcrypt";
import userService from '../service/user-service';import { nextTick } from "node:process";
;


const register = async ( req: Request, res: Response, next: NextFunction ) => {
    try{
        const { email, password, nume, telefon} = req.body;


        const userData = await userService.registration(email, password, nume, telefon);
    
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return res.json(userData);
    } catch (error: unknown) {
        next(error);
    }

};

const login = async ( req: Request, res: Response, next: NextFunction ) => {
    try{
        const { email, password } = req.body;

        const userData = await userService.login(email, password);
        
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return res.json(userData);

    } catch (error: unknown) {
        next(error);
    }
}

const logout = async ( req: Request, res: Response, next: NextFunction ) => {
    try{
        const {refreshToken} = req.cookies;
        const token = await userService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(token);
    } catch (error: unknown) {
        next(error);
    }
}

const activate = async (req: Request<{ link: string }>, res: Response, next: NextFunction) => {
    try {
        const activationLink = req.params.link;
        await userService.activate(activationLink);

        return res.redirect(process.env.CLIENT_URL || 'https://www.youtube.com')
    } catch (error: unknown) {
        next(error);
    }

};

const refresh = async ( req: Request, res: Response, next: NextFunction ) => {
    try{

    }catch(error){

    }
}

const getUsers = async ( req: Request, res: Response, next: NextFunction ) => {
    try{

    }catch(error){

    }
}

export { register, activate, login, logout }