import { IDependencies } from "@/application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";
import { Request, Response, NextFunction } from "express";
export const enrollmentProgressController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {
      useCases: { enrollmentProgressUseCase },
    } = dependencies;
    const progressData = req.body;
    if (!progressData.userId || !progressData.courseId) {
      return next(ErrorResponse.notFound("User ID and Course ID are required"));
    }
    try {
        const progress = await enrollmentProgressUseCase(dependencies).execute(progressData);
        if (!progress) {
            return next(ErrorResponse.badRequest("Enrollment not found"))
          }
          return res.status(200).json({
            success: true,
            data: progress,
            message: 'Progress updated',
          });
    } catch (error) {
        next(error)
    }
  };
};
