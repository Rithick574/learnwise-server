import {updateUserProfileConsumer,updateUserRoleConsumer,userBlockStatusChanged,userCreatedConsumer} from "./consumers"

interface IBaseSubscriber {
    userCreated: (data: any) => void;
    updateUserRole: (data: { email: string; newRole: string }) => Promise<void>;
    userBlockStatusChanged(data: {
      id: string;
      isBlocked: boolean;
    }): Promise<void>;
    userProfileUpdate(data: any): Promise<void>;
  }

export interface IChatSubscriber
  extends Pick<
    IBaseSubscriber,
    | "userCreated"
    | "updateUserRole"
    | "userBlockStatusChanged"
    | "userProfileUpdate"
  > {}

export const createSubscriber = (): IChatSubscriber => {
    return {
      userCreated: userCreatedConsumer,
      updateUserRole: updateUserRoleConsumer,
      userBlockStatusChanged: userBlockStatusChanged,
      userProfileUpdate: updateUserProfileConsumer,
    };
  };