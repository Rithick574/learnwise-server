import {
    userCreatedConsumer,
    requestForgotPasswordConsumer
} from "./consumers";

interface IUserEvents {
    userCreated(data: any): Promise<void>;
    requestForgotPassword(data:any):Promise<void>;
}

export interface INotificationSubscriber extends Pick<IUserEvents, 'userCreated'  | 'requestForgotPassword'> { }

export const createSubscriber = (): INotificationSubscriber => {
    return {
        userCreated: userCreatedConsumer,
        requestForgotPassword: requestForgotPasswordConsumer,
    }
}
