import { IDependencies } from "../../application/interfaces/IDependencies";
import { coursePaymentSuccessProducer } from "../../infrastructure/messages/kafka/producer";
import { ErrorResponse } from "@learnwise/common";
import { NextFunction, Request, Response } from "express";


export const savePaymentController = (dependencies: IDependencies) => {
    const {
        useCases: { savePaymentUseCase }
      } = dependencies;
      return async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        try {
            const response = await savePaymentUseCase(dependencies).execute(data);
            if(!response){
              return next(ErrorResponse.paymentRequired("Payment failed. Please try again"));
            }
            if (response.status === "completed") {
              if (response.userId && response.courseId && response.instructorRef) {
                await coursePaymentSuccessProducer({
                  userId: response.userId.toString(),
                  courseId: response.courseId.toString(),
                  amount: response.amount,
                  instructorRef:response.instructorRef.toString()
                });
              } else {
                return next(ErrorResponse.internalError("Payment data is incomplete"));
              }
            }
            return res.json({success:true,data:response,message:"payment success"});
        } catch (error) {
            next(error)
        }
      }
}
