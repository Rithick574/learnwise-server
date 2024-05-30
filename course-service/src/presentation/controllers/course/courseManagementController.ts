import { Request, Response, NextFunction } from "express";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";

export const courseManagementController = (dependencies: IDependencies) => {
    const {useCases:{PublishCoursesUseCase}} = dependencies;
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, action } = req.body;
            if (!id || !action) {
                return ErrorResponse.badRequest("Course ID and status are required")
            }
            const course=await PublishCoursesUseCase(dependencies).execute(id, action);
            res.status(200).json({
                success: true,
                data: course,
                message: "Course status changed successfully"
              });
        } catch (error:any) {
         next(error)   
        }
    }
}