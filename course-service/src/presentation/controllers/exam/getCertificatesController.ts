import { ErrorResponse } from "@learnwise/common";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";
export const getCertificatesController=(dependencies:IDependencies)=>{
return async(req:Request,res:Response,next:NextFunction)=>{
    const {useCases:{getCertificatesUseCase}} = dependencies;
    try {
        const {userId} = req.params;
        if(!userId){
            return next(ErrorResponse.badRequest("userId not in the body"))
        }
        const result = await getCertificatesUseCase(dependencies).execute(userId);
        if (!result) {
            return next(
              ErrorResponse.badRequest("failed to retrieve certificates")
            );
          };
          return res.status(201).json({
            success: true,
            data: result,
            message: "cerificates data",
          });
    } catch (error) {
        next(error)
    }
}
}