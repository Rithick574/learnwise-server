import { IReview } from "@/domain/entities/reviewEntity";
import { Review } from "../../models/review";

export const createReview = async (
  data: IReview
): Promise<IReview | boolean> => {
  try {
    const review = await Review.create(data);

    if (!review) {
      return false;
    }

    return review;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
