import { Message } from "../../models/message";


export const messageSeen = async (messageId: string) => {
    try {
        console.log('message seen :', messageId)

        const result = await Message.findByIdAndUpdate(messageId, { recieverSeen: true });
        return result;
    } catch (error) {
        console.log(error)
    }
}