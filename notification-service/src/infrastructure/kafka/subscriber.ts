import {
    userCreatedConsumer,
} from "./consumers";

interface IUserEvents {
    userCreated(data: any): Promise<void>;
}

export interface INotificationSubscriber extends Pick<IUserEvents, 'userCreated'> { }

export const createSubscriber = (): INotificationSubscriber => {
    return {
        userCreated: userCreatedConsumer,
    }
}
