import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";
import { NextFunction, Request, Response } from "express";

export const getExamController = (dependencies:IDependencies)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        const {useCases:{getExamUseCase}} = dependencies;
        try {
            const {courseId} = req.params;
            const result = await getExamUseCase(dependencies).execute(courseId);
            if(!result){
                return next(ErrorResponse.badRequest("failed to retrieve exam data"))
            }
            return res.status(201).json({
                success:true,
                data:result,
                message:"exam data"
            })
        } catch (error) {
            next(error)
        }
    }
}