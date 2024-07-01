import { ChatEntity } from "@/domain/entities";
import { Chat } from "../../models/chat";
import { Types } from "mongoose";

export const setLastSeen = async (userId: string, timestamp: Date = new Date()): Promise<void> => {
  try {
    console.log(userId, timestamp, 'saving last seen ...');

    const chat: ChatEntity | null = await Chat.findOne({ participants: userId });

    if (!chat) {
      throw new Error('Chat not found');
    }

    let userLastSeen = chat.lastSeen.find(
      (participant) => participant.participant.toString() === userId
    );

    if (userLastSeen) {
      userLastSeen.seenAt = timestamp;
    } else {
      chat.lastSeen.push({ participant: new Types.ObjectId(userId), seenAt: timestamp });
    }

    await chat.save();
    console.log('Last seen updated successfully');
  } catch (error) {
    console.error('Error updating last seen:', error);
  }
};
