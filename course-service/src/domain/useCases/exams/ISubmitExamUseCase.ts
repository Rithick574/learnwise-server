import { IExamResult } from "../../../domain/entities";

export interface ISubmitExamUseCase{
    execute(userId:string,courseId: string,result:any):Promise<IExamResult | boolean>
}