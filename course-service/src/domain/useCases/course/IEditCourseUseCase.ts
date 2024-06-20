import { CourseEntity } from "@/domain/entities/CourseEntity";


export interface IEditCourseUseCase {
    execute(courseId:string,data: CourseEntity): Promise<CourseEntity | boolean>;
}