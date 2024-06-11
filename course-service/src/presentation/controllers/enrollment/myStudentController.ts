import { Request, Response, NextFunction } from "express";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";



export const myStudentsController = (dependencies:IDependencies)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        const {useCases:{myStudentsUseCase}}=dependencies;
        const {id} = req.params
        if (!id){
            return next(ErrorResponse.notFound("courseId and userId are required"))
        }
        try {
            const enrollmentStatus= await myStudentsUseCase(dependencies).execute(id);
            if(!enrollmentStatus){
                return next(ErrorResponse.badRequest("students list retrieval failed"))
            }           
            res.status(200).json({
                success: true,
                data: enrollmentStatus,
                message: "instructor wise students list"
              });
        } catch (error) {
            next(error)
        }
    }
}