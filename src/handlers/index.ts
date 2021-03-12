import { NextFunction, Request, Response } from "express";
import { ErrorStatus } from "../interfaces/ErrorStatus";


export const notFound = (req, res, next) =>{
    const error = new Error("Not found") as ErrorStatus;
    error.status = 400
    next(error);
}

export const errorHandler =(error:ErrorStatus, req:Request, res:Response, next:NextFunction) =>{
   return res.status(error.status||500).json({
       message:error.message||"something went wrong",
       success:false
   })
}

export * from './user';



