import { IDependencies } from "@/application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";
import { Request, Response, NextFunction } from "express";


export const getEnrolledController = (dependencies:IDependencies)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        const {useCases:{getEnrollmentUseCase}}=dependencies;
        const courseId = req.query.courseId as string;
        const userId = req.query.userId as string;
        if (!courseId || !userId){
            return next(ErrorResponse.notFound("courseId and userId are required"))
        }
        try {
            const enrollmentStatus= await getEnrollmentUseCase(dependencies).execute(courseId,userId);
            if(!enrollmentStatus){
                return next(ErrorResponse.badRequest("Enrollment retrieval failed"))
            }           
            res.status(200).json({
                success: true,
                data: enrollmentStatus,
                message: "Enrollment status"
              });
        } catch (error) {
            next(error)
        }
    }
}