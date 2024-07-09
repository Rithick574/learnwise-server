import { CourseEntity } from "../../../../../domain/entities/CourseEntity";
import { Course } from "../../models/course";
import { ErrorResponse } from "@learnwise/common";

export const createCourse = async (
  data: CourseEntity
): Promise<CourseEntity | null> => {
  try {
    const course = await Course.create(data);

    if (!course) {
      throw ErrorResponse.internalError("Course creation failed!");
    }

    return course;
  } catch (error: any) {
    if (error instanceof ErrorResponse) {
      throw error;
    }
    throw ErrorResponse.internalError(
      error.message || "An unexpected error occurred"
    );
  }
};
