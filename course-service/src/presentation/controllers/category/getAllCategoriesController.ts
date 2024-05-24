import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const getAllCategoriesController = (dependencies: IDependencies) => {
  const {
    useCases: { getAllCategoriesUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, search, page = 1, limit = 10 } = req.query;
      let filter:any = {};
      if (status) {
        if (status === "active") {
          filter.isBlocked = true;
        } else {
          filter.isBlocked = false;
        }
      }
      if (search) {
        filter.title = { $regex: new RegExp(search as string, "i") };
      }
      const result = await getAllCategoriesUseCase(dependencies).execute(filter, Number(page), Number(limit));

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
