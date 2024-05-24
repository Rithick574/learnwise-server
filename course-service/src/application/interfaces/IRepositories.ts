import { CategoryEntity } from "@/domain/entities/categoryEntity";


export interface IRepositories {
    getAllCategories: (filter: any, page: number, limit: number) => Promise<CategoryEntity[] | null>;
    getAvailableCategories: () => Promise<CategoryEntity[] | null>;
    createCategory: (data: CategoryEntity) => Promise<CategoryEntity | null>;
    updateCategory: (data: CategoryEntity) => Promise<CategoryEntity | null>;
}