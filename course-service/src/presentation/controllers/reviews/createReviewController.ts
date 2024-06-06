import { IDependencies } from "@/application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";
import { Request, Response, NextFunction } from "express";

export const createReviewController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {
      useCases: { createReviewUseCase },
    } = dependencies;
    const data = req.body;

    try {
      const review = await createReviewUseCase(dependencies).execute(data);
      if (!review) {
        return next(ErrorResponse.badRequest("error while create review"));
      }
      res.status(200).json({
        success: true,
        data: review,
        message: "Enrollment status",
      });
    } catch (error) {
      next(error);
    }
  };
};
