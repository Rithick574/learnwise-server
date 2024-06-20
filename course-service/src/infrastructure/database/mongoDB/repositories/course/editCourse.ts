import { CourseEntity } from "@/domain/entities/CourseEntity";
import { Course } from "../../models/course";
import { ErrorResponse } from "@learnwise/common";

export const  editCourse = async(courseId:string,data:CourseEntity):Promise<CourseEntity | boolean> =>{
    try {
        const course = await Course.updateOne({_id:courseId},{$set:data},{new:true});

    if (!course) {
      return false;
    }
    return true;
    } catch (error) {
        if (error instanceof ErrorResponse) {
            throw error;
          }
          throw ErrorResponse.internalError(
            (error as Error).message || "An unexpected error occurred"
          );
    }
}