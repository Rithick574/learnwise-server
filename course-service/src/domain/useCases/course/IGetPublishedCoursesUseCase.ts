import { CourseEntity } from "@/domain/entities/CourseEntity";


export interface IGetPublishedCoursesUseCase {
    execute(): Promise<CourseEntity[] | null>;
}