import { IDependencies } from "../../../application/interfaces/IDependencies";
import { CourseEntity } from "../../../domain/entities/CourseEntity";

export const editCourseUseCase=(dependencies:IDependencies)=>{
    const {repositories:{editCourse}} = dependencies;
    return {
        execute:async(courseId:string,data:CourseEntity)=>{
            return await editCourse(courseId,data)
        }
    }
}