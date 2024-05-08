import {
    userCreatedConsumer,
    requestForgotPasswordConsumer,
    instructorEmailconfirmation
} from "./consumers";

interface IUserEvents {
    userCreated(data: any): Promise<void>;
    requestForgotPassword(data:any):Promise<void>;
    emailNotificationForInstructorApplication(data:any):Promise<void>;
}

export interface INotificationSubscriber extends Pick<IUserEvents, 'userCreated'  | 'requestForgotPassword' | 'emailNotificationForInstructorApplication'> { }

export const createSubscriber = (): INotificationSubscriber => {
    return {
        userCreated: userCreatedConsumer,
        requestForgotPassword: requestForgotPasswordConsumer,
        emailNotificationForInstructorApplication: instructorEmailconfirmation,
    }
}
