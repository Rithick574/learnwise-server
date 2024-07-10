import { IDependencies } from "@/application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";
import { NextFunction, Request, Response } from "express";


export const getSubscribedInstructors=(dependencies:IDependencies)=>{
    const {useCases:{getStudentsSubscriptionUseCase}} = dependencies;
    return async (req:Request,res:Response,next:NextFunction)=>{
        const {userEmail} = req.params;
        try {
            const InstructorDetails = await getStudentsSubscriptionUseCase(dependencies).execute(userEmail);
            if(!InstructorDetails){
                return next(ErrorResponse.notFound("failed to retrieve the data. Please try again"));
            };
            return res.json({success:true,data:InstructorDetails,message:"subscription data"});
        } catch (error) {
            next(error)
        }
    }
}