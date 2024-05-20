import { CategoryEntity } from "@/domain/entities/categoryEntity";


export interface IRepositories {
    getAllCategories: () => Promise<CategoryEntity[] | null>;
    getAvailableCategories: () => Promise<CategoryEntity[] | null>;
    createCategory: (data: CategoryEntity) => Promise<CategoryEntity | null>;
    updateCategory: (data: CategoryEntity) => Promise<CategoryEntity | null>;
}