import { Request, Response, NextFunction } from "express";
import { IDependencies } from "@/application/interfaces/IDependencies";

export const getPublishedCoursesController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {
      useCases: { getPublishedCoursesUseCase },
    } = dependencies;

    try {
      const { category, price, search, sort, page = 1, limit = 4 } = req.query;
      const categoryStr = category as string | undefined;
      const priceStr = price as string | undefined;
      const searchStr = search as string | undefined;
      const sortStr = sort as string | undefined;
      const pageNum = parseInt(page as string, 10) || 1;
      const limitNum = parseInt(limit as string, 10) || 4;

      const courses = await getPublishedCoursesUseCase(dependencies).execute(
        categoryStr,
        priceStr,
        searchStr,
        sortStr,
        pageNum,
        limitNum
      );

      res.status(200).json({
        success: true,
        data: courses,
        message: "Published and unblocked courses retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  };
};
