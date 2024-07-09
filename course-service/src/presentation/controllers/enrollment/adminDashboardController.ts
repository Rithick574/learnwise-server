import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";
import { Request, Response, NextFunction } from "express";


export const adminDashboard = (dependencies:IDependencies)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        const {useCases:{ adminDashboardUseCase,getTopCourseUseCase }}=dependencies;
        try {
            const EnrollmentData = await adminDashboardUseCase(dependencies).execute();
            if(!EnrollmentData){
                return next(ErrorResponse.badRequest("EnrollmentData retrieval failed"))
            }
            const getTopCourse = await getTopCourseUseCase(dependencies).execute();
            res.status(200).json({
                success: true,
                data: {EnrollmentData,getTopCourse},
                message: "EnrollmentData"
              });
        } catch (error) {
            next(error);
        }
    }
}