import { NextFunction, Request, Response } from "express";
import { IEvent } from "../models/event";
import * as db from '../models'


export const createEvent = async(req:Request, res:Response, next:NextFunction)=>{

    try {
        const eventsDTO:String[] = [];

        const {id} = res.locals.decode;

        const eventDTO = req.body as IEvent[];

        eventDTO.map(event=>{
            const exist = eventsDTO.indexOf(event.date) > -1;

            if(exist) throw new Error("No se puede añadir eventos con la misma fecha u hora")

            eventsDTO.push(event.date);

            event.user = id
        });

        eventDTO.map(async(e)=>{
            const exist = await db.Event.findOne({date:e.date}) as IEvent
            if(exist) throw new Error("Ya existe une evento con la misma fecha");
        });


        const event = await db.Event.insertMany(eventDTO);

        const user = await db.User.findById(id);

        event.map((event)=>{
            user.events.push(event.id)
        });

        await user.save();

        res.status(201).json({
            message:"The event(s) was created",
            success:true,
            eventDTO
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

        const events = await db.Event.find({user:id}).populate("user", "-events")

        res.status(200).json({
            events
        })

    } catch (error) {
        next(error);
    }
}

export const deletEvent = async(req:Request, res:Response , next:NextFunction) =>{
    const {event_id} = req.params;
    const event = await db.Event.findById(event_id);

    event.remove();

    res.status(200).json({
        message:"El evento ha sido elimminado",
        event
    })
}
