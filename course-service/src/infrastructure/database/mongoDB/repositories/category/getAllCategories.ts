import { Category } from "../../models/category";

export const getAllCategories = async (filter: any, page: number, limit: number) => {
    try {
        const skip = (page - 1) * limit;
        const result = await Category.find(filter).skip(skip).limit(limit).sort({createdAt:-1});
        const totalAvailableCategories = await Category.countDocuments(filter);
        return{ result,totalAvailableCategories};
    } catch (error: any) {
        throw new Error(error?.message || "Categories retrievel failed");
    }
}
