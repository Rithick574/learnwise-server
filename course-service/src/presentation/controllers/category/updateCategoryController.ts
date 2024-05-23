import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const updateCategoryController = (dependencies: IDependencies) => {
  const {
    useCases: { updateCategoryUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const result = await updateCategoryUseCase(dependencies).execute(body);

      if (!result) {
        throw new Error("Category updation failed");
      }

      res.status(200).json({
        success: true,
        data: result,
        message: "Category updated!",
      });
    } catch (error) {
      next(error);
    }
  };
};
