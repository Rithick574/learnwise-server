import { IDependencies } from "@/application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const findNotificationController=(dependencies:IDependencies)=>{
    const{
        useCases:{findNotificationUseCase}
    }=dependencies
    return async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const data=req.params.id
            console.log("🚀 ~ file: findNotification.ts:11 ~ return ~ data:", data)
            
            const result=await findNotificationUseCase(dependencies).execute(data)
            if(!result){
                throw new Error("can't find Notification")
            }
            res.status(201).json({
                success:true,
                data:result,
                message:'notification'
            })
        } catch (error) {
            next(error)
        }
    }
}