import { Request, Response } from "express";
import { User } from "../models/user_model";
import { error } from "node:console";
import bcrypt from "bcrypt";
import userService from '../service/user-service';;


const register = async ( req: Request, res: Response, ) => {
    try{
        const { email, password, nume, telefon} = req.body;


        const userData = await userService.registration(email, password, nume, telefon);
    
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return res.json(userData);
    } catch (error) {
        console.error('Eroare la legare:', error);
        res.status(400).json({ message: (error as Error).message });
    }

};

const login = async (req: Request, res: Response) => {
    try{

    }catch(error){

    }
}

const logout = async (req: Request, res: Response) => {
    try{

    }catch(error){

    }
}

const activate = async (req: Request<{ link: string }>, res: Response) => {
    try {
        const activationLink = req.params.link;
        await userService.activate(activationLink);

        return res.redirect(process.env.CLIENT_URL || 'https://www.youtube.com')
    } catch (error) {
        return res.status(400).json({
            message: (error as Error).message
        });
    }
};

const refresh = async (req: Request, res: Response) => {
    try{

    }catch(error){

    }
}

const getUsers = async (req: Request, res: Response) => {
    try{

    }catch(error){

    }
}

export { register, activate }