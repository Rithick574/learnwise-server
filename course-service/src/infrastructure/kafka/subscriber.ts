import {
  userCreatedConsumer,
  coursePaymentSuccessConsumer,
  updateUserRoleConsumer,
  userBlockStatusChanged,
  updateUserProfileConsumer,
  subscriptionConsumer
} from "./consumers";

interface IBaseSubscriber {
  userCreated: (data: any) => void;
  coursePaymentSuccess: (data: any) => void;
  updateUserRole: (data: { email: string; newRole: string }) => Promise<void>;
  userBlockStatusChanged(data: {
    id: string;
    isBlocked: boolean;
  }): Promise<void>;
  userProfileUpdate(data: any): Promise<void>;
  subscription: (data: { instructorId: string; amount: number }) => Promise<void>;
}

export interface ICourseSubscriber
  extends Pick<
    IBaseSubscriber,
    | "userCreated"
    | "coursePaymentSuccess"
    | "updateUserRole"
    | "userBlockStatusChanged"
    | "userProfileUpdate"
    | "subscription"
  > {}

export const createSubscriber = (): ICourseSubscriber => {
  return {
    userCreated: userCreatedConsumer,
    coursePaymentSuccess: coursePaymentSuccessConsumer,
    updateUserRole: updateUserRoleConsumer,
    userBlockStatusChanged: userBlockStatusChanged,
    userProfileUpdate: updateUserProfileConsumer,
    subscription:subscriptionConsumer
  };
};
