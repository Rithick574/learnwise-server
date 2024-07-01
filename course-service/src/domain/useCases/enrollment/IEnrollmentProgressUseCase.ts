import { EnrollmentEntity } from "@/domain/entities"

export interface IEnrollmentProgressUseCase{
    execute(progressData:any):Promise<EnrollmentEntity | null>
}