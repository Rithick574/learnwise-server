import { CategoryEntity } from "../../../domain/entities/categoryEntity";

export interface IGetAllCategoriesUseCase {
    execute(filter: any, page: number, limit: number):  Promise<{ result: CategoryEntity[]; totalAvailableCategories: number }>;
}