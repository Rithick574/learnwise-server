import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";
import { Request, Response, NextFunction } from "express";


export const salesReportController = (dependencies:IDependencies)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        const {useCases:{salesReportUseCase}}=dependencies;
        const { startDate, endDate } = req.query;
        if(!startDate || !endDate){
            return next(ErrorResponse.badRequest("please select start and end dates"))
        };
        try {
            const salesReport=await salesReportUseCase(dependencies).execute(startDate as string,endDate as string);
            if(!salesReport){
                return next(ErrorResponse.badRequest("error while generating sales report"))
            };
            res.status(200).json({
                success:true,
                data:salesReport,
                message:"sales report"
            });
        } catch (error) {
            next(error)
        }

    }
}