import { CourseEntity } from "@/domain/entities/CourseEntity";


export interface IGetCourseUseCase {
    execute(id:string): Promise<CourseEntity[] | null>;
}