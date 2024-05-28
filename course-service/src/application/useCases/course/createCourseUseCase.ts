import { IDependencies } from "@/application/interfaces/IDependencies";
import { CourseEntity } from "@/domain/entities/CourseEntity";


export const createCourseUseCase = (dependencies: IDependencies) => {

    const {
        repositories: { createCourse }
    } = dependencies;

    return {
        execute: async (data: CourseEntity) => {
            return await createCourse(data);
        }
    }
};