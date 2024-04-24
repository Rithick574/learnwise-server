import { ICreateUserUseCase,ILoginUserUseCase } from "@/domain/useCases"; 


export interface IUseCases {
    createUserUseCase: (dependencies: any) => ICreateUserUseCase;
    loginUserUseCase: (dependencies: any) => ILoginUserUseCase;
}
