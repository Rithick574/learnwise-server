import { ChatEntity } from "@/domain/entities";
import { User } from "../../models/user";
import { Chat } from "../../models/chat";

export const createChat = async (data: ChatEntity) => {
    try {
        console.log("🚀 ~ file: createChat.ts:6 ~ createChat ~ data:", data);
        let chat;
        const participantIds = await Promise.all(
            data.participants.map(async (participant) => {
                if (typeof participant === 'string' && participant.includes('@')) {
                    const user = await User.findOne({ email: participant });
                    if (!user) {
                        throw new Error(`User with email ${participant} not found`);
                    }
                    return user._id;
                }
                return participant;
            })
        );

        if (data.type === 'individual') {
            chat = await Chat.findOne({
                participants: { $all: participantIds, $size: 2 },
                type: 'individual'
            });

            if (!chat) {
                chat = new Chat({
                    participants: participantIds,
                    type: 'individual',
                    status: data.status || 'requested',
                    messages: []
                });
                await chat.save();
            }
        } else if (data.type === 'group') {
            chat = new Chat({
                participants: participantIds,
                type: 'group',
                status: data.status || 'requested',
                groupName: data.groupName,
                groupId:data.groupId,
                groupDescription: data.groupDescription,
                messages: []
            });
            await chat.save();
        }

        return chat as ChatEntity;
    } catch (error: any) {
        throw new Error(error?.message);
    }
}
