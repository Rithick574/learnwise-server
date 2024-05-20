import { Schema, model } from "mongoose";
import {CategoryEntity} from "@/domain/entities/categoryEntity"

const categorySchema= new Schema ({
    title:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

export const Category=model<CategoryEntity>("categories",categorySchema)