export interface IGetTotalStudentsForInstructorUseCase{
    execute(instructorRef:string):Promise<any | boolean>
}