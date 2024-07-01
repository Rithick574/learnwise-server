import {Types,Document} from 'mongoose';

interface ILastSeen {
    participant: Types.ObjectId;
    seenAt: Date;
  }

export interface ChatEntity extends Document {
    _id?: string | Types.ObjectId;
    participants: Types.ObjectId[] | string[];
    type: "individual" | "group";
    status: 'requested' | "active" | 'block';
    groupName?: string | null;
    lastSeen: ILastSeen[];
    groupDescription?: string | null;
    groupId?:string|null;
    messages?: Types.ObjectId[] | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
}