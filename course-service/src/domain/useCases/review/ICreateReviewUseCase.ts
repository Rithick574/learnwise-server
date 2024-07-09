import { IReview } from "../../../domain/entities";

export interface ICreateReviewUseCase {
  execute(data: IReview): Promise<IReview | boolean>;
}
