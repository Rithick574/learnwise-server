import {
  sendVerificationMailConsumer,
  updateUserRoleConsumer,
  userBlockStatusChanged,
  updateUserProfileConsumer 
} from "./consumers";

export interface ISubscriber {
  sendVerificationMail(data: any): Promise<void>;
  updateUserRole: (data: { email: string; newRole: string }) => Promise<void>;
  userBlockStatusChanged(data: { id: string; isBlocked: boolean }): Promise<void>;
  userProfileUpdate(data: any): Promise<void>;
}

export interface IAuthSubscriber
  extends Pick<ISubscriber, "sendVerificationMail" | "updateUserRole" | "userBlockStatusChanged" | "userProfileUpdate"> {}

export const createSubscriber = (): IAuthSubscriber => {
  return {
    sendVerificationMail: sendVerificationMailConsumer,
    updateUserRole: updateUserRoleConsumer,
    userBlockStatusChanged:userBlockStatusChanged,
    userProfileUpdate: updateUserProfileConsumer
  };
};
