import { ICreateUserUseCase } from "@/domain/useCases/ICreateUserUseCase"; 


export interface IUseCases {
    createUserUseCase: (dependencies: any) => ICreateUserUseCase;
}
