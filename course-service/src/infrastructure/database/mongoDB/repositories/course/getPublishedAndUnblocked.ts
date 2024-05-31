import { CourseEntity } from "@/domain/entities/CourseEntity";
import { Course } from "../../models/course";
import { ErrorResponse } from "@learnwise/common";

export const getPublishedAndUnblocked = async (): Promise<
  CourseEntity[] | null
> => {
  try {
    const courses = await Course.find({ isPublished: true, isBlocked: false })
      .populate("instructorRef", "firstName")
      .populate("categoryRef", "title");
    return courses;
  } catch (error: any) {
    if (error instanceof ErrorResponse) {
      throw error;
    }
    throw ErrorResponse.internalError(
      error.message || "An unexpected error occurred"
    );
  }
};
