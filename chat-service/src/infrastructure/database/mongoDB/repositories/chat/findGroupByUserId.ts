import { ChatEntity } from "@/domain/entities";
import { Chat } from "../../models/chat";
import { Types } from "mongoose";

export const findGroupByUserId = async (userId: string): Promise<ChatEntity[] | null> => {
  try {
  
    const userObjectId = new Types.ObjectId(userId);

    const chats = await Chat.find({
      participants: userObjectId,
      type: "group",
    }).exec();

    if (!chats.length) {
      throw new Error("No groups found for the user");
    }

    return chats as ChatEntity[];
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
