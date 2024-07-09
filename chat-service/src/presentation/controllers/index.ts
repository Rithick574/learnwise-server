import { IDependencies } from '../../application/interfaces/IDependencies'
import { createChatController } from './createChatController'
import { createMessageController } from './createMessageController'
import { getChatAndMessages } from './getChatAndMessages'
import { getChatByUserId } from './getChatByUserId'
import { findNotificationController } from './findNotification'



export const controllers=(dependencies:IDependencies)=>{
    return{
        createChat:createChatController(dependencies),
        createMessage:createMessageController(dependencies),
        getChatByUserId:getChatByUserId(dependencies),
        getChat:getChatAndMessages(dependencies),
        findNotification:findNotificationController(dependencies)
    }
}