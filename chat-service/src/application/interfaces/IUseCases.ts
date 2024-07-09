import { ICreateChatUseCase, ICreateMessageUseCase, IFindNotificationUseCase, IfindChatByUseCase, IfindChatByUserIdUseCase, IfindGroupByUserUseCase } from "../../domain/useCases";
import { IDependencies } from "./IDependencies";

export interface IUseCases{
    createChatUseCase:(dependencies:IDependencies)=>ICreateChatUseCase;
    createMessageUseCase:(dependencies:IDependencies)=>ICreateMessageUseCase;
    findGroupByUserId:(dependencies:IDependencies)=>IfindGroupByUserUseCase;
    findchatByIdUseCase:(dependencies:IDependencies)=>IfindChatByUseCase;
    findChatByUserIdUseCase:(dependencies:IDependencies)=>IfindChatByUserIdUseCase;
    findNotificationUseCase:(dependencies:IDependencies)=>IFindNotificationUseCase;
}