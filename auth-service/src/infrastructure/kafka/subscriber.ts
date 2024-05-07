import {
  sendVerificationMailConsumer,
  updateUserRoleConsumer,
  userBlockStatusChanged
} from "./consumers";

export interface ISubscriber {
  sendVerificationMail(data: any): Promise<void>;
  updateUserRole: (data: { email: string; newRole: string }) => Promise<void>;
  userBlockStatusChanged(data: { userId: string; isBlocked: boolean }): Promise<void>;
}

export interface IAuthSubscriber
  extends Pick<ISubscriber, "sendVerificationMail" | "updateUserRole" | "userBlockStatusChanged"> {}

export const createSubscriber = (): IAuthSubscriber => {
  return {
    sendVerificationMail: sendVerificationMailConsumer,
    updateUserRole: updateUserRoleConsumer,
    userBlockStatusChanged:userBlockStatusChanged
  };
};
