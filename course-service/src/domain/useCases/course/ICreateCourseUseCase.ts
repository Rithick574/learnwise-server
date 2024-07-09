import { CourseEntity } from "../../../domain/entities/CourseEntity";


export interface ICreateCourseUseCase {
    execute(data: CourseEntity): Promise<CourseEntity | null>;
}