import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';



export const auth = (req:Request, res:Response, next:NextFunction) =>{
    try {
        if(req.headers.authorization){
            if(req.headers.authorization.split(" ")[0] !== "Bearer") next(Error("The token format is not correct"))
            const token = req.headers.authorization.split(" ")[1]
            jwt.verify(token, process.env.SECRET, (error, decode)=>{
                if(error){
                    next(Error("Failed to authenticate token"))
                }else{
                    res.locals.decode = decode;
                    next();
                }
            })
        }else{
            throw new Error("No token provider")
        }
    } catch (error) {
        error.status = 403;
        next(error)
    }
}