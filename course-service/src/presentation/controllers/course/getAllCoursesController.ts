import { Request, Response, NextFunction } from "express";
import { IDependencies } from "@/application/interfaces/IDependencies";

export const getAllCoursesController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {
      useCases: { getAllCoursesUseCase }
    } = dependencies;

    try {
      const courses = await getAllCoursesUseCase(dependencies).execute();

      res.status(200).json({
        success: true,
        data: courses,
        message: "Courses retrieved successfully"
      });
    } catch (error) {
      next(error);
    }
  };
};