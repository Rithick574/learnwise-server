import { EnrollmentEntity } from "@/domain/entities";

export interface IMyStudentsUseCase{
    execute(id:string,filter: any, page: number, limit: number):Promise<EnrollmentEntity[] | boolean>;
}