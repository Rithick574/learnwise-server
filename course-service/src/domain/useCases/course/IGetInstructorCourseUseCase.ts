import { CourseEntity } from "../../../domain/entities/CourseEntity";


export interface IGetInstructorCourseUseCase {
    execute(id:string): Promise<CourseEntity[] | null>;
}