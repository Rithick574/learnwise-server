import { CategoryEntity } from "@/domain/entities/categoryEntity";

export interface IGetAllCategoriesUseCase {
    execute(): Promise<CategoryEntity[] | null>;
}