import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import mongoose from "mongoose";

export const getCourseController = (dependencies: IDependencies) => {
    const {
        useCases: { getCourseUseCase }
      } = dependencies;
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid ID!!!");
              }
            const course=await getCourseUseCase(dependencies).execute(id)
            res.status(200).json({
                success: true,
                data: course,
                message: "Course retrieved successfully"
              });
        } catch (error:any) {
         next(error)   
        }
    }
}