import { ISubscription } from "@/domain/entities";
import { Subscription } from "../models/Subscription";

export const getSubscriptionData= async(userId:string,instructorId:string):Promise<ISubscription | null>=>{
try {
    const getData = await Subscription.findOne({userId:userId,instructorId:instructorId});
    return getData;
} catch (error) {
    throw new Error((error as Error).message);
}
}