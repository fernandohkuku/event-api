import { NextFunction } from "express";
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcryptjs'
import { User } from ".";

export interface User extends Document{
    name:string;
    username:string;
    lastName?:string;
    email:string;
    password:string;
    created:Date;
    events:mongoose.Schema.Types.ObjectId[]
}

export interface IUser extends User{
    comparePassword(password: string): boolean; 
}


const userSchema:Schema = new mongoose.Schema<User>({
    name:String,
    lastName:String,
    password:String,
    username:{type:String, required:true, unique:true},
    created:{
        type:Date,
        default:Date.now
    },
    events:[{
        type:mongoose.Schema.Types.ObjectId, ref:'Event'
    }]
})



userSchema.pre<User>("save", async function(next){
    try {
        if(!this.isModified("password")){
            return next()
        }
        const hash = await bcrypt.hash(this.password, 10);
        console.log(hash)
        this.password = hash;
    } catch (error) {
        console.log(error)
        return next(error)
    }
});

userSchema.method("comparePassword", async function(attemp:string, next:NextFunction){
    try {
        return  bcrypt.compare(attemp,this.get("password"))
    } catch (error:any) {
        next(error)
    }
})


userSchema.set('toJSON',{
    virtuals:true,
    transform:(doc, ret, options)=>{
        ret.id = ret._id
        delete ret._id;
        delete ret.__v;
    }
})




export default mongoose.model<IUser>('User', userSchema);