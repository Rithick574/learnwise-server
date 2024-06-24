import { Chat } from "../../models/chat";

export const addUserToGroup = async (data: any) => {
  try {
    let chat = await Chat.findOne({
      groupId: data.courseId,
      type: "group",
    }).exec();

    if (!chat) {
      throw new Error("Can't find the group");
    }

    if (!chat.participants.includes(data.userId)) {
      chat.participants.push(data.userId);
      await chat.save();
    }

    return chat;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
