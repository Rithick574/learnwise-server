export interface IGetExamUseCase{
    execute(courseId: string):Promise<any | boolean>
}