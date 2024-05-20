import { Category } from "../../models/category";

export const getAvailableCategories = async () => {
    try {
        const result = await Category.find({ isBlocked: false });
        return result;
    } catch (error: any) {
        throw new Error(error?.message || "Categories retrievel failed");
    }
}
