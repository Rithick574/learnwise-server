import { Request, Response, NextFunction } from "express";
import { IDependencies } from "@/application/interfaces/IDependencies";
import mongoose from "mongoose";

export const updateCourseStatusController = (dependencies: IDependencies) => {
  const {
    useCases: { updateCourseStatusUseCase }
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID!!!");
      }

      const updatedCourse = await updateCourseStatusUseCase(dependencies).execute(id, status);

      res.status(200).json({
        success: true,
        data: updatedCourse,
        message: "Course status updated successfully"
      });
    } catch (error: any) {
      next(error);
    }
  };
};
