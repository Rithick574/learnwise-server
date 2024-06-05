import { IDependencies } from "@/application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";
import { Request, Response, NextFunction } from "express";

export const getReviewsController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {
      useCases: { getReviewUseCase },
    } = dependencies;
    const {id} = req.params
    try {
      const review = await getReviewUseCase(dependencies).execute(id);
      if (!review) {
        return next(ErrorResponse.badRequest("error while retrieving reviews"));
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
