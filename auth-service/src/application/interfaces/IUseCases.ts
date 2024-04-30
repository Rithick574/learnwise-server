import { ICreateUserUseCase,ILoginUserUseCase,IFindUserByIdUseCase,IFindUserByEmailUseCase,IVerifyOtpUseCase,IUpdateUserPasswordUseCase } from "@/domain/useCases"; 


export interface IUseCases {
    createUserUseCase: (dependencies: any) => ICreateUserUseCase;
    loginUserUseCase: (dependencies: any) => ILoginUserUseCase;
    findUserByIdUseCase: (dependencies: any) => IFindUserByIdUseCase;
    findUserByEmailUseCase: (dependencies: any) => IFindUserByEmailUseCase;
    verifyOtpUseCase:(dependencies:any)=> IVerifyOtpUseCase;
    updateUserPasswordUseCase: (dependencies: any) => IUpdateUserPasswordUseCase;
}
