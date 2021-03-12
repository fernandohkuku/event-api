import { NextFunction } from "express";
import mongoose, { Schema, Document } from "mongoose";


export interface IEvent extends Document{
    name:string;
    description:string;
    date:Date;
    user:mongoose.Schema.Types.ObjectId
}

const eventSchema:Schema = new mongoose.Schema<IEvent>({
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:String,
    date:Date,
    user:{
        type:mongoose.Schema.Types.ObjectId, ref:'User'
    }
})


eventSchema.set('toJSON',{
    virtuals:true,
    transform:(doc, ret, options)=>{
        ret.id = ret._id
        delete ret._id;
        delete ret.__v;
    }
})

export default mongoose.model('Event', eventSchema);