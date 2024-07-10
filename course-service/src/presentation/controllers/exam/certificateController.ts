import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";
import { NextFunction, Request, Response } from "express";
export const certificateController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {
      useCases: { createCertificateUseCase },
    } = dependencies;
    try {
      const {userId} = req.params;
      const {courseName, url } = req.body;
      if (!userId || !courseName || !url) {
        return ErrorResponse.badRequest("Missing required fields");
      }
      const result = await createCertificateUseCase(dependencies).execute(
        userId,
        courseName,
        url
      );
      if (!result) {
        return next(
          ErrorResponse.badRequest("failed to upload the certificate")
        );
      }
      return res.status(201).json({
        success: true,
        data: result,
        message: "cerificate data",
      });
    } catch (error) {
      next(error);
    }
  };
};
