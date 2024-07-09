import { CategoryEntity } from "../../../../../domain/entities/categoryEntity";
import { Category } from "../../models/category";
import {ErrorResponse} from "@learnwise/common"

export const updateCategory = async (
    data: CategoryEntity
): Promise<CategoryEntity | null> => {
    try {
        const normalizedTitle = data.title.trim().toLowerCase();
        const existingCategory = await Category.findOne({ 
            title: { $regex: new RegExp(`^${normalizedTitle}$`, 'i') }, 
            _id: { $ne: data._id } 
        });

        if (existingCategory) {
            throw ErrorResponse.conflict("Category with this title already exists!");
        }

        const updatedData = { ...data, title: normalizedTitle };
        
        const category = await Category.findByIdAndUpdate(data._id, updatedData, { new: true });

        if (!category) {
            throw ErrorResponse.internalError("Category updation failed!");
        }

        return category;

    } catch (error: any) {
        if (error instanceof ErrorResponse) {
            throw error; 
        }
        throw ErrorResponse.internalError(error.message || "An unexpected error occurred");
    }
    }