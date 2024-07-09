import { CourseEntity } from "../../../domain/entities/CourseEntity";


export interface IGetAllCoursesUseCase {
    execute(filter: any, page: number, limit: number): Promise<CourseEntity[] | null>;
}