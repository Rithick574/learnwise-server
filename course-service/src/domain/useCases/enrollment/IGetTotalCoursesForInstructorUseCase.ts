export interface IGetTotalCoursesForInstructorUseCase{
    execute(instructorRef:string):Promise<any | boolean>
}