import { Types } from "mongoose";

export interface CategoryEntity {
    _id: Types.ObjectId;
    title: string;
    thumbnail:string;
    isBlocked: boolean;
}