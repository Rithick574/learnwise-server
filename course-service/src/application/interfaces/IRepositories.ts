import { CourseEntity } from "@/domain/entities/CourseEntity";
import { CategoryEntity } from "@/domain/entities/categoryEntity";


export interface IRepositories {
    getAllCategories: (filter: any, page: number, limit: number) =>  Promise<{ result: CategoryEntity[]; totalAvailableCategories: number }>;
    getAvailableCategories: () => Promise<CategoryEntity[] | null>;
    createCategory: (data: CategoryEntity) => Promise<CategoryEntity | null>;
    updateCategory: (data: CategoryEntity) => Promise<CategoryEntity | null>;
    createCourse: (data: CourseEntity) => Promise<CourseEntity | null>;
}