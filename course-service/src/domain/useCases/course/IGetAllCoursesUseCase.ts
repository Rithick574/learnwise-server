import { CourseEntity } from "@/domain/entities/CourseEntity";


export interface IGetAllCoursesUseCase {
    execute(): Promise<CourseEntity[] | null>;
}