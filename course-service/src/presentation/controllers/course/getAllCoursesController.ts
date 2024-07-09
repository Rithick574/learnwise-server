import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getAllCoursesController = (dependencies: IDependencies) => {
  const {
    useCases: { getAllCoursesUseCase }
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, search, page = 1, limit = 10 } = req.query;
      let filter:any = {};
      if (status) {
        if (status === "active") {
          filter.isBlocked = false;
        } else if(status === "blocked") {
          filter.isBlocked = true;
        }else if(status === "published"){
          filter.isPublished = true;
        }else{
          filter.isPublished = false;
        }
      }
      if (search) {
        filter.title = { $regex: new RegExp(search as string, "i") };
      }
      const courses = await getAllCoursesUseCase(dependencies).execute(filter, Number(page), Number(limit));

      res.status(200).json({
        success: true,
        data: courses,
        message: "Courses retrieved successfully"
      });
    } catch (error) {
      next(error);
    }
  };
};