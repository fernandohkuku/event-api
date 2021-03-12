import { NextFunction, Request, Response } from "express";
import { IEvent } from "../models/event";
import * as db from '../models'


export const createEvent = async(req:Request, res:Response, next:NextFunction)=>{

    try {

        const {id} = res.locals.decode;

        const eventDTO = req.body as IEvent;

        eventDTO.user = id;
    
        const event = await db.Event.create(eventDTO);

        const user = await db.User.findById(id);

        user.events.push(event.id);

        await user.save();

        res.status(201).json({
            message:"The event was created",
            success:true,
            event
        })
    } catch (error) {
        if (error.code === 11000) {
            error.status = 400;
            error.message = "this event is already exist";
        }
        next(error);
    }
}



export const getEvents = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const {id} = res.locals.decode;

        const events = await db.Event.find({user:id}).populate("user")

        res.status(200).json({
            events
        })

    } catch (error) {
        next(error);
    }
}