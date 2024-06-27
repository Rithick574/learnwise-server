import { ChatEntity } from "@/domain/entities";
import { Chat } from "../../models/chat";

export const findChatByUserId = async (
  userId: string
): Promise<ChatEntity[] | false> => {
  try {
    const chats = await Chat.find({
      participants: { $in: [userId] },
      type: "individual",
    }).populate("participants");

    if (!chats) {
      return false;
    }
    return chats;
  } catch (error) {
    throw new Error((error as Error)?.message);
  }
};
