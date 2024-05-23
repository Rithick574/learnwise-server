import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const getAvailableCategoriesController = (
  dependencies: IDependencies
) => {
  const {
    useCases: { getAvailableCategoriesUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getAvailableCategoriesUseCase(
        dependencies
      ).execute();

      if (!result) {
        throw new Error("Categories retrievel failed");
      }

      res.status(200).json({
        success: true,
        data: result,
        message: "Categories retrieved!",
      });
    } catch (error) {
      next(error);
    }
  };
};
