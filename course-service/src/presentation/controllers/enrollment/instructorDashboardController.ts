import { Request, Response, NextFunction } from "express";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";

export const instructorDashboardController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {
      useCases: {
        getEnrollmentsForInstructorOverTimeUseCase,
        getTopCoursesForInstructorUseCase,
        getTotalStudentsForInstructorUseCase,
        getTotalCoursesForInstructorUseCase,
      },
    } = dependencies;
    
    const { instructorRef } = req.params;
    if (!instructorRef) {
      return next(ErrorResponse.notFound("Instructor ID is required"));
    }

    try {
      const [
        enrollments,
        topCourse,
        totalStudents,
        totalCourses
      ] = await Promise.all([
        getEnrollmentsForInstructorOverTimeUseCase(dependencies).execute(instructorRef),
        getTopCoursesForInstructorUseCase(dependencies).execute(instructorRef),
        getTotalStudentsForInstructorUseCase(dependencies).execute(instructorRef),
        getTotalCoursesForInstructorUseCase(dependencies).execute(instructorRef),
      ]);

      if (!enrollments || !topCourse || !totalStudents || !totalCourses) {
        return next(
          ErrorResponse.badRequest(
            "Error while fetching instructor dashboard data"
          )
        );
      }

      return res.status(200).json({
        success: true,
        data: { enrollments, topCourse, totalStudents, totalCourses },
        message: "Enrollments retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  };
};
