import { CourseEntity } from "../../../../../domain/entities/CourseEntity";
import { Course } from "../../models/course";
import { ErrorResponse } from "@learnwise/common";

export const getPublishedAndUnblocked = async (
  categoryStr : string | undefined,
  priceStr : string | undefined,
  searchStr : string | undefined,
  sortStr : string | undefined,
  pageNum : number | undefined,
  limitNum : number | undefined
): Promise<{
  courses: CourseEntity[];
  totalAvailableCourses: number;
} | null> => {
  try {
    let filter: any = { isPublished: true, isBlocked: false };
    if (categoryStr) {
      filter.categoryRef = { $in: categoryStr.split(",") };
    }
    if (searchStr) {
      filter.title = { $regex: new RegExp(searchStr, "i") };
    }
    if (priceStr) {
      const priceRanges: { [key: string]: any } = {
        "Under 1000": { $lte: 1000 },
        "1000-2000": { $gte: 1000, $lte: 2000 },
        "2000-5000": { $gte: 2000, $lte: 5000 },
        "5000-10000": { $gte: 5000, $lte: 10000 },
        "Above 10000": { $gte: 10000 },
      };
      filter["pricing.amount"] = priceRanges[priceStr] || {};
    }

    let sortOptions: any = {};

    if (sortStr === "created-desc") {
      sortOptions.createdAt = -1;
    } else if (sortStr === "price-asc") {
      sortOptions["pricing.amount"] = 1;
    } else if (sortStr === "price-desc") {
      sortOptions["pricing.amount"] = -1;
    } else {
      sortOptions.createdAt = -1;
    }

    const skip = (pageNum ? pageNum - 1 : 0) * (limitNum ? limitNum : 10);

    const courses = await Course.find(filter)
      .populate("instructorRef", "firstName")
      .populate("categoryRef", "title")
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum ? limitNum : 10);

    const totalAvailableCourses = await Course.countDocuments(filter);

    return { courses, totalAvailableCourses };
  } catch (error: any) {
    if (error instanceof ErrorResponse) {
      throw error;
    }
    throw ErrorResponse.internalError(
      error.message || "An unexpected error occurred"
    );
  }
};
