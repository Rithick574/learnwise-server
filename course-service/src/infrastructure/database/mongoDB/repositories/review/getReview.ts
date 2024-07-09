import { IReview } from "../../../../../domain/entities/reviewEntity";
import { Review } from "../../models/review";

export const getReview = async (
  courseId: string
): Promise<IReview[] | boolean> => {
  try {
    const review = await Review.find({ courseId }).populate(
      "userId",
      "firstName lastName profile.avatar"
    );

    if (!review) {
      return false;
    }

    return review;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};