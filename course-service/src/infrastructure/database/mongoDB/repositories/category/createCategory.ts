import { CategoryEntity } from "@/domain/entities/categoryEntity";
import { Category } from "../../models/category";


export const createCategory = async (
    data: CategoryEntity
): Promise<CategoryEntity | null> => {
    try {
        const normalizedTitle = data.title.trim().toLowerCase();
        const existingCategory = await Category.findOne({ title: { $regex: new RegExp(`^${normalizedTitle}$`, 'i') } });
        if (existingCategory) {
            throw new Error("Category with this title already exists!");
        }
        const categoryData = { ...data, title: normalizedTitle };

        const category = await Category.create(categoryData);

        if (!category) {
            throw new Error("Category creation failed!");
        }

        return category;

    } catch (error: any) {
        throw new Error(error?.message);
    }
}