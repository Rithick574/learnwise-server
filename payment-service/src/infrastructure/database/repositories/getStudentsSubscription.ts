import { Subscription } from "../models/Subscription";

export const getStudentsSubscription=async(userEmail:string):Promise<any | null>=>{
    try {
        const data = await Subscription.find({userId:userEmail});
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}