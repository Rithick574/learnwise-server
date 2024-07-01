import { ChatEntity } from "@/domain/entities";
import { Chat } from "../../models/chat";

export const findChatById = async (chatId: string): Promise<ChatEntity | null> => {
  try {
    const chat = await Chat.findById(chatId).populate({
      path: "messages",
      populate: {
        path: "sender",
        select: "userName profileImageUrl",
      },
    }) as ChatEntity | null;

    if (!chat) {
      throw new Error("Chat not found");
    }
    return chat;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
