import { CourseEntity } from "@/domain/entities/CourseEntity";
import { Course } from "../../models/course";
import { ErrorResponse } from "@learnwise/common";


export const courseRepository=async(filter: any, page: number, limit: number):Promise<CourseEntity[] | null> =>{
    try {
      const skip = (page - 1) * limit;
        const courses = await Course.find(filter).populate({ path: "categoryRef", select: "title" }).populate({path:"instructorRef",select:"firstName"}).skip(skip).limit(limit).sort({createdAt:-1});
        
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