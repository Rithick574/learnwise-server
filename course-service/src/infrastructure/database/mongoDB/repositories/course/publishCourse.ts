import { CourseEntity } from "../../../../../domain/entities/CourseEntity";
import { ErrorResponse } from "@learnwise/common";
import { Course } from "../../models/course";

export const publishCourse = async (
  id: string,
  action: string
): Promise<CourseEntity | null> => {
try {
    let isPublished;
    if (action === "active") {
        isPublished = true;
    } else if (action === "unpublish") {
        isPublished = false;
    } else {
      throw new Error("Invalid status value");
    }
    const updatedCourse = await Course.findByIdAndUpdate(
        id,
        { isPublished },
        { new: true }
      );
  
      if (!updatedCourse) {
        throw ErrorResponse.notFound("Course not found");
      }
  
      return updatedCourse;
} catch (error:any) {
    if (error instanceof ErrorResponse) {
        throw error;
      }
      throw ErrorResponse.internalError(
        error.message || "An unexpected error occurred"
      );
}
}