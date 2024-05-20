import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";


export const createCategoryController = (dependencies: IDependencies) => {
const {useCases:{createCategoryUseCase}} = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            const result = await createCategoryUseCase(dependencies)
                .execute(body);

            if(!result){
                throw new Error("Category creation failed");
            }

            res.status(200).json({
                success: true,
                data: result,
                message: "Category created!"
            });
        } catch (error) {
            next(error);
        }
    }
}