import { NextFunction } from "express";
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcryptjs'

export interface User extends Document{
    name:string;
    username:string;
    lastName:string;
    password:string
}


const userSchema:Schema = new mongoose.Schema<User>({
    name:String,
    lastName:String,
    password:String,
    username:{type:String, required:true, unique:true}
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


userSchema.methods.comparePassword =async function(attemp:string, next:NextFunction){
    try {
        
        return await bcrypt.compare(attemp,this.get("password"))
    } catch (error:any) {
        next(error)
    }
}


export default mongoose.model('User', userSchema);