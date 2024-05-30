import { CourseEntity } from "@/domain/entities/CourseEntity";


export interface IPublishCoursesUseCase {
    execute(id:string,action:string): Promise<CourseEntity | null>;
}