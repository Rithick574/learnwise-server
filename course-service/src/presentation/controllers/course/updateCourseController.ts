import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import mongoose from "mongoose";

export const updateCourseController = (dependencies: IDependencies) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid ID!!!");
              }
            // const course=await 
            // res.status(200).json({
            //     success: true,
            //     data: course,
            //     message: "Course updated successfully"
            //   });
        } catch (error:any) {
         next(error)   
        }
    }
}