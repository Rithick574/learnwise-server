import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";
import { Request, Response, NextFunction } from "express";

export const getEnrollmentByUserIdController = (
  dependencies: IDependencies
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {
      useCases: {getEnrollmentByUserIdUseCase},
    } = dependencies;
    const { userId } = req.params;
    if (!userId) {
      return next(ErrorResponse.notFound("User ID and Course ID are required"));
    }
    try {
        const courses = await getEnrollmentByUserIdUseCase(dependencies).execute(userId);
        if (!courses) {
            return next(ErrorResponse.badRequest("courses not found"))
          }
          return res.status(200).json({
            success: true,
            data: courses,
            message: 'user courses',
          });
    } catch (error) {
        next(error)
    }
  };
};
