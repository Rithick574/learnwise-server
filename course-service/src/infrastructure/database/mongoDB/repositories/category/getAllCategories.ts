import { Category } from "../../models/category";

export const getAllCategories = async (filter: any, page: number, limit: number) => {
    try {
        const skip = (page - 1) * limit;
        const result = await Category.find(filter).skip(skip).limit(limit);
        return result;
    } catch (error: any) {
        throw new Error(error?.message || "Categories retrievel failed");
    }
}
