export interface IGetTopCoursesForInstructorUseCase{
    execute(instructorRef:string):Promise<any | boolean>
}