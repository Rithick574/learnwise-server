import { IDependencies } from "@/application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";
import { NextFunction, Request, Response } from "express";

export const submitExamController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {
      useCases: { submitExamUseCase },
    } = dependencies;
    console.log("🚀 ~ file: submitExamController.ts:11 ~ return ~ req.query:", req.query)
    const { courseId, userId } = req.query;
    console.log("🚀 ~ file: submitExamController.ts:11 ~ return ~ courseId:", courseId)
    const results = req.body;
    try {
      console.log("Results:", results);
      console.log("Course ID:", courseId);
      console.log("User ID:", userId);
      const submissionResult= await submitExamUseCase(dependencies).execute(userId as string, courseId as string, results);
      if(!submissionResult){
        return next(ErrorResponse.badRequest("failed to submit exam result"))
      }
      return res.status(201).json({
        success:true,
        data:submissionResult,
        message:"exam result"
    })
    } catch (error) {
      console.log("🚀 ~ file: submitExamController.ts:28 ~ return ~ error:", error)
      next(error);
    }
  };
};
