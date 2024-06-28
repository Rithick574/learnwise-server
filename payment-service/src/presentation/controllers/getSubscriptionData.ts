import { IDependencies } from "@/application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";
import { NextFunction, Request, Response } from "express";

export const getSubscriptionDataController = (dependencies:IDependencies)=>{
    const {useCases:{getSubscriptionDataUseCase} }= dependencies;
    return async (req: Request, res: Response, next: NextFunction) => {
        const {userId,instructorId} = req.params;
        try {
            const result = await getSubscriptionDataUseCase(dependencies).execute(userId,instructorId);
            if(!result){
                return next(ErrorResponse.paymentRequired("failed to retrieve the data. Please try again"));
              }
            return res.json({success:true,data:result,message:"subscription data"});
        } catch (error) {
            next(error)
        }
    }
}