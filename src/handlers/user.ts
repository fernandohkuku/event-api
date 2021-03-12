import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../models/user";
import * as db from '../models'

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userDTO: User = req.body;

        const user = await db.User.create(userDTO);

        res.status(201).json({
            message: "El usuario ha sido creado",
            user
        });

    } catch (error) {
        if (error.code === 11000) {
            error.status = 400;
            error.message = "this user has already taken";
        }
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const { username, password } = req.body as User
        
        const user = await db.User.findOne({ username: username });

        const isUserValid = await user.comparePassword(password);

        const {id, name} = user;
        
        if(isUserValid){
            const token = jwt.sign({id, name}, process.env.SECRET);
            res.status(200).json({
                id, name, token
            })
        }

    } catch (error) {
        error.status =400;
        error.message ="username/password incorrect"
        next(error)
    }
}


export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id } = req.params;

        const user = await db.User.findById(user_id);

        user.remove();

        res.status(201).json({
            message: "El usuario ha sido eliminado",
            user
        })
    } catch (error) {
        next(error);
    }
}