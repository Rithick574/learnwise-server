import { CategoryEntity } from "../../../../../domain/entities/categoryEntity";
import { Category } from "../../models/category";
import {ErrorResponse} from "@learnwise/common"

export const createCategory = async (
    data: CategoryEntity
): Promise<CategoryEntity | null> => {
    try {
        const normalizedTitle = data.title.trim().toLowerCase();
        const existingCategory = await Category.findOne({ title: { $regex: new RegExp(`^${normalizedTitle}$`, 'i') } });
        if (existingCategory) {
            throw ErrorResponse.conflict("Category with this title already exists!");
        }
        const categoryData = { ...data, title: normalizedTitle };

        const category = await Category.create(categoryData);

        if (!category) {
            throw new Error("Category creation failed!");
        }

        return category;

    } catch (error: any) {
        if (error instanceof ErrorResponse) {
            throw error; 
        }
        throw ErrorResponse.internalError(error.message || "An unexpected error occurred");
    }
}