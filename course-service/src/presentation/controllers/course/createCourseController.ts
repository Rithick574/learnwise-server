import { Request, Response, NextFunction } from "express";
import { IDependencies } from "@/application/interfaces/IDependencies";

export const createCourseController =(dependencies: IDependencies)=>{

    return async(req:Request,res:Response,next:NextFunction)=>{
        const {
            useCases: { createCourseUseCase }
        } = dependencies;
        try {
            const data = req.body;
            console.log("🚀 ~ file: createCourseController.ts:12 ~ returnasync ~ data:", data)
            
            const result = await createCourseUseCase(dependencies)
                .execute(data);

                if(!result){
                    throw new Error("Course creation failed!");
                }

                res.status(200).json({
                    success: true,
                    data: result,
                    message: "Course created!"
                });
        } catch (error) {
            next(error)
        }
    }
}