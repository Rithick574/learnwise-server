import { userCreatedConsumer, coursePaymentSuccessConsumer } from "./consumers";

interface IBaseSubscriber {
  userCreated: (data: any) => void;
  coursePaymentSuccess: (data: any) => void;
}

export interface ICourseSubscriber extends Pick<IBaseSubscriber, 'userCreated' | 'coursePaymentSuccess'> {}

export const createSubscriber = (): ICourseSubscriber => {
  return {
    userCreated: userCreatedConsumer,
    coursePaymentSuccess: coursePaymentSuccessConsumer,
  };
}
