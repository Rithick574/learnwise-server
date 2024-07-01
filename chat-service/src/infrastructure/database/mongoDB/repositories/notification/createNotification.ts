import { Notification } from "../../models/notification";


export const saveNotification=async(data:any)=>{
  console.log("🚀 ~ file: createNotification.ts:2 ~ Notification:", data)
    try {
        const newNotification = new Notification({
            recipientId: data.recipientId,
            content: data.content,
            type: data.type || 'other',
            read: false
          });
          console.log('notification saving');
          
          const savedNotification = await newNotification.save();
      
          console.log('Notification saved successfully:', savedNotification);
          return savedNotification;
        } catch (error) {
          console.error('Error saving notification:', error);
          throw error; 
        }
}