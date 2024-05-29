import { Request, Response, NextFunction } from "express";
import { IDependencies } from "@/application/interfaces/IDependencies";

export const courseManagementController = (dependencies: IDependencies) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const course=await 
            // res.status(200).json({
            //     success: true,
            //     data: course,
            //     message: "Course status changed successfully"
            //   });
        } catch (error:any) {
         next(error)   
        }
    }
}