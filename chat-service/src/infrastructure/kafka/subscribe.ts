import {
  updateUserProfileConsumer,
  updateUserRoleConsumer,
  userBlockStatusChanged,
  userCreatedConsumer,
  createChat,
  createGroupChat,
} from "./consumers";

interface IBaseSubscriber {
  userCreated: (data: any) => void;
  updateUserRole: (data: { email: string; newRole: string }) => Promise<void>;
  userBlockStatusChanged(data: {
    id: string;
    isBlocked: boolean;
  }): Promise<void>;
  userProfileUpdate(data: any): Promise<void>;
  createChat(data: any): Promise<void>;
  createGroupChat(data: any): Promise<void>;
}

export interface IChatSubscriber
  extends Pick<
    IBaseSubscriber,
    | "userCreated"
    | "updateUserRole"
    | "userBlockStatusChanged"
    | "userProfileUpdate"
    | "createChat"
    | "createGroupChat"
  > {}

export const createSubscriber = (): IChatSubscriber => {
  return {
    userCreated: userCreatedConsumer,
    updateUserRole: updateUserRoleConsumer,
    userBlockStatusChanged: userBlockStatusChanged,
    userProfileUpdate: updateUserProfileConsumer,
    createChat: createChat,
    createGroupChat: createGroupChat,
  };
};
