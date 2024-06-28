import { ISubscription } from "@/domain/entities/index";

export interface IGetSubscriptionDataUseCase {
  execute(userId: string,instructorId:string): Promise<ISubscription | null>
}