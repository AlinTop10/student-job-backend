import { Request, Response } from "express";
import { User } from "../models/user_model";
import { error } from "node:console";
import bcrypt from "bcrypt";

const register = async ( req: Request, res: Response ) => {

    const { email, password, nume, telefon} = req.body;

    try{
        const candidat = await User.findOne({where: { email }});

        if(candidat){
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashedPassword,
            nume,
            telefon
        });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Eroare la legare:', error);
        res.status(500).json({ message: "Internal server error"});
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

const activate = async (req: Request, res: Response) => {
    try{

    }catch(error){

    }
}

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

export { register }