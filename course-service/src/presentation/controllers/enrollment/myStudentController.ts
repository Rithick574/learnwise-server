import { Request, Response, NextFunction } from "express";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";

export const myStudentsController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { useCases: { myStudentsUseCase } } = dependencies;
    const { id } = req.params;
    const { search, page = 1, limit = 10 } = req.query;

    if (!id) {
      return next(ErrorResponse.notFound("Instructor ID is required"));
    }
    try {
      const enrollmentStatus = await myStudentsUseCase(dependencies).execute(id, search, Number(page), Number(limit));
      if (!enrollmentStatus) {
        return next(ErrorResponse.badRequest("Students list retrieval failed"));
      }
      res.status(200).json({
        success: true,
        data: enrollmentStatus,
        message: "Instructor's students list",
      });
    } catch (error) {
      next(error);
    }
  };
};
