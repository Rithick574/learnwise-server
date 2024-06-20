export interface ICreateExamUseCase{
    execute(courseId: string, questions: any):Promise<any | boolean>
}