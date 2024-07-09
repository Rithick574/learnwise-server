import { CategoryEntity } from "../../../domain/entities/categoryEntity";


export interface ICreateCategoryUseCase {
    execute(data: CategoryEntity): Promise<CategoryEntity | null>;
}