import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";
import { Request, Response, NextFunction } from "express";

export const adminPaymentController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {
      useCases: { paymentListUseCase },
    } = dependencies;

    try {
      const {
        status="",
        search="",
        page = "1",
        limit = "10",
      } = req.query as {
        status?: string;
        search?: string;
        page?: string;
        limit?: string;
      };

      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);

      const result = await paymentListUseCase(dependencies).execute(
        status,
        search,
        pageNumber,
        limitNumber
      );

      if (!result) {
        return next(
          ErrorResponse.badRequest("Failed to retrieve payment data")
        );
      }

      const { formattedPayments, totalAvailablePayments } = result;

      res.status(200).json({
        success: true,
        data: { formattedPayments, totalAvailablePayments },
        message: "Payment Data",
      });
    } catch (error) {
      next(error);
    }
  };
};
