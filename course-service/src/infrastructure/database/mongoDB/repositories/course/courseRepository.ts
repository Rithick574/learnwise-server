import { CourseEntity } from "@/domain/entities/CourseEntity";
import { Course } from "../../models/course";
import { ErrorResponse } from "@learnwise/common";


export const courseRepository=async():Promise<CourseEntity[] | null> =>{
    try {
        const courses = await Course.find()
        
    if (!courses) {
        throw ErrorResponse.internalError("Course creation failed!");
      }
    return courses;
    } catch (error:any) {
        if (error instanceof ErrorResponse) {
            throw error;
          }
          throw ErrorResponse.internalError(
            error.message || "An unexpected error occurred"
          );
        }
}