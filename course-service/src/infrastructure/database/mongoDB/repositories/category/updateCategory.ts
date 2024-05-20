import { CategoryEntity } from "@/domain/entities/categoryEntity";
import { Category } from "../../models/category";


export const updateCategory = async (
    data: CategoryEntity
): Promise<CategoryEntity | null> => {
    try {

        const category = await Category.findByIdAndUpdate(data._id, {
            title: data.title,
            isBlocked: data.isBlocked
        }, { new: true });

        if (!category) {
            throw new Error("Category updation failed!");
        }

        return category;

    } catch (error: any) {
        throw new Error(error?.message);
    }
}