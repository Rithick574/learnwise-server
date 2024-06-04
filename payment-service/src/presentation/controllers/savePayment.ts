import { IDependencies } from "@/application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";


export const savePaymentController = (dependencies: IDependencies) => {
    const {
        useCases: { savePaymentUseCase }
      } = dependencies;
      return async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        try {
            const response = await savePaymentUseCase(dependencies).execute(data);
            return res.json({success:true,message:"payment successfully saved"});
        } catch (error) {
            next(error)
        }
      }
}