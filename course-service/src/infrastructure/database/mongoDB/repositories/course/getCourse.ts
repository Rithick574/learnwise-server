import { CourseEntity } from "@/domain/entities/CourseEntity";
import { Course } from "../../models/course";
import { ErrorResponse } from "@learnwise/common";


export const getCourse=async(id:string):Promise<CourseEntity[] | null> =>{
    try {
        const course = await Course.find({_id:id})
        
    if (!course) {
        throw ErrorResponse.notFound("Course not found");
      }
    return course;
    } catch (error:any) {
        if (error instanceof ErrorResponse) {
            throw error;
          }
          throw ErrorResponse.internalError(
            error.message || "An unexpected error occurred"
          );
        }
}