import { EnrollmentEntity } from "@/domain/entities";

export interface IGetEnrollmentUseCase{
    execute(courseId:string,userId:string):Promise<EnrollmentEntity | null | boolean>;
}