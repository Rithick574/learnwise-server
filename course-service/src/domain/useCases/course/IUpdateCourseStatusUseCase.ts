import { CourseEntity } from "../../../domain/entities/CourseEntity";


export interface IUpdateCourseStatusUseCase {
    execute(id:string,status:string): Promise<CourseEntity | null>;
}