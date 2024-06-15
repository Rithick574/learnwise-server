import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "@/_lib/common/error";

export const getAllUsersController = (dependencies: IDependencies) => {
  const {
    useCases: {getAllUsersUseCase},
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAllUser = await getAllUsersUseCase(dependencies).execute();
      if(!getAllUser){
        return next(
            ErrorResponse.badRequest(
              "We couldn't find the User Data"
            )
          );
      };
      res.status(200).json({
        success: true,
        data: getAllUser,
        message: "getAllUsers!",
      });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: (error as Error)?.message,
          });
    }
  };
};
