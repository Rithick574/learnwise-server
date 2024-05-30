import { CourseEntity } from "@/domain/entities/CourseEntity";
import { ErrorResponse } from "@learnwise/common";
import { Course } from "../../models/course";

export const updateCourseStatus = async (
  id: string,
  status: string
): Promise<CourseEntity | null> => {
  try {
    let isBlocked;

    if (status === "active") {
      isBlocked = false;
    } else if (status === "blocked") {
      isBlocked = true;
    } else {
      throw new Error("Invalid status value");
    }
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { isBlocked },
      { new: true }
    );

    if (!updatedCourse) {
      throw ErrorResponse.notFound("Course not found");
    }

    return updatedCourse;
  } catch (error: any) {
    if (error instanceof ErrorResponse) {
      throw error;
    }
    throw ErrorResponse.internalError(
      error.message || "An unexpected error occurred"
    );
  }
};
