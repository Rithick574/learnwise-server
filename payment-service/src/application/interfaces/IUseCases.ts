import { ISavePaymentUseCase } from "@/domain/useCases";
import { IDependencies } from "./IDependencies";


export interface IUseCases {
    savePaymentUseCase: (dependencies: IDependencies) => ISavePaymentUseCase;
  }