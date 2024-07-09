import { IDependencies } from "../../../application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const createExamController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {
      useCases: { createExamUseCase },
    } = dependencies;
    try {
      const { courseId } = req.params;
      const questions = req.body;

      const result = await createExamUseCase(dependencies).execute(
        courseId,
        questions
      );
      if (result) {
        res
          .status(201)
          .json({
            message: "Exam created successfully",
            data: result,
            success: true,
          });
      } else {
        res.status(400).json({ message: "Failed to create exam" });
      }
    } catch (error) {
      next(error);
    }
  };
};
