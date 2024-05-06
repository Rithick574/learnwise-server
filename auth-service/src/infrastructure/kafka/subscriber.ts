import {
  sendVerificationMailConsumer,
  updateUserRoleConsumer,
} from "./consumers";

export interface ISubscriber {
  sendVerificationMail(data: any): Promise<void>;
  updateUserRole: (data: { email: string; newRole: string }) => Promise<void>;
}

export interface IAuthSubscriber
  extends Pick<ISubscriber, "sendVerificationMail" | "updateUserRole"> {}

export const createSubscriber = (): IAuthSubscriber => {
  return {
    sendVerificationMail: sendVerificationMailConsumer,
    updateUserRole: updateUserRoleConsumer,
  };
};
