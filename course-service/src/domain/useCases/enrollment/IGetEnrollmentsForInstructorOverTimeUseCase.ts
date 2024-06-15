export interface IGetEnrollmentsForInstructorOverTimeUseCase{
    execute(instructorRef:string):Promise<any | boolean>
}