import { IDependencies } from "../../../application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const getAllCategoriesController = (dependencies: IDependencies) => {
  const {
    useCases: { getAllCategoriesUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, search, page = 1, limit = 10 } = req.query;
      let filter: any = {};
      if (status) {
        if (status === "active") {
          filter.isBlocked = false;
        } else {
          filter.isBlocked = true;
        }
      }
      if (search) {
        filter.title = { $regex: new RegExp(search as string, "i") };
      }
      const { result: categories, totalAvailableCategories } =
        await getAllCategoriesUseCase(dependencies).execute(
          filter,
          Number(page),
          Number(limit)
        );

      res.status(200).json({ categories, totalAvailableCategories });
    } catch (error) {
      next(error);
    }
  };
};
