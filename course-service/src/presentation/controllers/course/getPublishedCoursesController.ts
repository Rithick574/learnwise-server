import { Request, Response, NextFunction } from "express";
import { IDependencies } from "@/application/interfaces/IDependencies";

export const getPublishedCoursesController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {
      useCases: { getPublishedCoursesUseCase }
    } = dependencies;

    try {
      const courses = await getPublishedCoursesUseCase(dependencies).execute();

      res.status(200).json({
        success: true,
        data: courses,
        message: "Published and unblocked courses retrieved successfully"
      });
    } catch (error) {
      next(error);
    }
  };
};