import { ISavePaymentUseCase,IGetSubscriptionDataUseCase,IetStudentsSubscriptionUseCase } from "../../domain/useCases";
import { IDependencies } from "./IDependencies";


export interface IUseCases {
    savePaymentUseCase: (dependencies: IDependencies) => ISavePaymentUseCase;
    getSubscriptionDataUseCase:(dependencies : IDependencies)=> IGetSubscriptionDataUseCase;
    getStudentsSubscriptionUseCase:(dependencies : IDependencies)=>IetStudentsSubscriptionUseCase;
   }