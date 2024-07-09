import { IDependencies } from "../../application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";
import stripe from "stripe";

export const createCheckoutSessionController = (dependencies: IDependencies)=>{
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const stripeInstance = new stripe(process.env.STRIPE_SECRET as string);
            const { amount, courseId, userId, courseName,thumbnail } = req.body;
            const lineItems = [
                {
                  price_data: {
                    currency: "INR",
                    product_data: {
                      name: courseName,
                      images: [thumbnail],
                    },
                    unit_amount: Math.floor(amount * 100), 
                  },
                  quantity: 1,
                },
              ];

              const session = await stripeInstance.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: "http://localhost:5173/course/paymentsuccess",
                cancel_url: "http://localhost:5173/courses/paymentfailed",
                metadata: {
                    userId: userId,
                    courseId: courseId,
                  },
              });

              res.status(200).json({ success: true, id: session.id ,message:"payment response"});

        } catch (error) {
            next(error)
        }
    }
}

