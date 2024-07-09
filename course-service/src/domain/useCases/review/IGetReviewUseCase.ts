import { IReview } from "../../../domain/entities";

export interface IGetReviewUseCase {
  execute(courseId:string): Promise<IReview[] | boolean>;
}

