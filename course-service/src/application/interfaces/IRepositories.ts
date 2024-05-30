import { CourseEntity } from "@/domain/entities/CourseEntity";
import { CategoryEntity } from "@/domain/entities/categoryEntity";


export interface IRepositories {
    getAllCategories: (filter: any, page: number, limit: number) =>  Promise<{ result: CategoryEntity[]; totalAvailableCategories: number }>;
    getAvailableCategories: () => Promise<CategoryEntity[] | null>;
    createCategory: (data: CategoryEntity) => Promise<CategoryEntity | null>;
    updateCategory: (data: CategoryEntity) => Promise<CategoryEntity | null>;
    createCourse: (data: CourseEntity) => Promise<CourseEntity | null>;
    courseRepository:(filter: any, page: number, limit: number)=>Promise<CourseEntity[] | null>;
    getPublishedAndUnblocked:()=>Promise<CourseEntity[] | null >;
    getCourse:(id:string)=>Promise<CourseEntity | null>;
    updateCourseStatus:(id:string,status:string)=>Promise<CourseEntity | null>
    getInstructorCourse:(id:string)=>Promise<CourseEntity[]| null >
    publishCourse:(id:string,action:string)=>Promise<CourseEntity | null>
}