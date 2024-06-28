import {Schema } from "mongoose";

export interface ISubscription {
    _id?: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    instructorId: Schema.Types.ObjectId;
    subscriptionId?: string;
    status?: string;
    currentPeriodEnd: number;
    amount: number;
  }