import { EnrollmentEntity } from "@/domain/entities";

export interface IMyStudentsUseCase{
    execute(id:string):Promise<EnrollmentEntity[] | boolean>;
}