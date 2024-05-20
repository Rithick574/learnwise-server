import { CategoryEntity } from "@/domain/entities/categoryEntity";

export interface IGetAvailableCategoriesUseCase {
    execute(): Promise<CategoryEntity[] | null>;
}