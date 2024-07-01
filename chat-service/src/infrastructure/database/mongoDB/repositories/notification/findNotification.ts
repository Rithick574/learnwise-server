import { Notification } from "../../models/notification";

export const findNotification = async (data: any) => {
  try {
    const notifications = await Notification.find({ recipientId: data })
      .sort({ createdAt: -1 }) 
      .limit(5); 
    return notifications;
  } catch (error) {
    console.log(error);
  }
};
