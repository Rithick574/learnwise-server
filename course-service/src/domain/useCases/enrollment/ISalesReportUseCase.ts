

export interface ISalesReportUseCase{
    execute(startDate:string,endDate:string):Promise<any | boolean>;
}