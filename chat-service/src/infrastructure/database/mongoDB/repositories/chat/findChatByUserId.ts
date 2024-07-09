import { ChatEntity } from "../../../../../domain/entities";
import { Chat } from "../../models/chat";
import { Types } from "mongoose";

export const findChatByUserId = async (userId: string): Promise<ChatEntity[] | false> => {
  try {
    const chats = await Chat.find({
      participants: { $in: [new Types.ObjectId(userId)] }, 
      type: "individual",
    }).populate("participants");

    if (!chats || chats.length === 0) {
      return false;
    }
    return chats as ChatEntity[];
  } catch (error) {
    throw new Error((error as Error)?.message);
  }
};
