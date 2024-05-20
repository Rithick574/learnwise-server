import { Category } from "../../models/category";

export const getAllCategories = async () => {
    try {
        const result = await Category.find({});
        return result;
    } catch (error: any) {
        throw new Error(error?.message || "Categories retrievel failed");
    }
}
