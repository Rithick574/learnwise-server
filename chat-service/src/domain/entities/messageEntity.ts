import { Types } from "mongoose";

export interface MessageEntity {
    _id?: string | Types.ObjectId;
    chat?: string | Types.ObjectId;
    sender: Types.ObjectId | string;
    receiver?: Types.ObjectId | string; 
    content: string;
    contentType: 'text';
    receiverSeen?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
