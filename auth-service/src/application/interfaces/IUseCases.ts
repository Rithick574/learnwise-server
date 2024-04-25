import { ICreateUserUseCase,ILoginUserUseCase,IFindUserByIdUseCase } from "@/domain/useCases"; 


export interface IUseCases {
    createUserUseCase: (dependencies: any) => ICreateUserUseCase;
    loginUserUseCase: (dependencies: any) => ILoginUserUseCase;
    findUserByIdUseCase: (dependencies: any) => IFindUserByIdUseCase;
}
