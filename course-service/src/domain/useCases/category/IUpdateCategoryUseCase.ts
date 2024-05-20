import { CategoryEntity } from "@/domain/entities/categoryEntity";

export interface IUpdateCategoryUseCase {
    execute(data: CategoryEntity): Promise<CategoryEntity | null>;
}