import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";

export const editCourseController =(dependencies:IDependencies)=>{
    const {useCases:{editCourseUseCase}} = dependencies;
    return async(req:Request,res:Response,next:NextFunction)=>{ 
    try {
        const {courseId} = req.params;
        const data=req.body;
        console.log("🚀 ~ file: editCourseController.ts:12 ~ returnasync ~ courseId:", courseId)
        console.log("🚀 ~ file: editCourseController.ts:10 ~ returnasync ~ data:", data)
        const result = await editCourseUseCase(dependencies).execute(courseId,data);
        if(!result){
            return next(ErrorResponse.badRequest("course update failed"));
        }
        res.status(200).json({
            success:true,
            data:result,
            message:"course Updated"
        });
    } catch (error) {
        next(error)
    }
} 
}