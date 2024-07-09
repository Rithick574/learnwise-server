import { IDependencies } from "../../application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2024-04-10",
});

export const createSubscriptionSessionController = (
  dependencies: IDependencies
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { email, instructorId } = req.body;
    if (!email || !instructorId) {
      return res
        .status(400)
        .json({ error: "Email and instructorId are required" });
    }
    try {
      const lineItems = [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Pro Subscription",
            },
            unit_amount: Math.floor(199 * 100),
          },
          quantity: 1,
        },
      ];
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/instructors/subscription/success`,
        cancel_url: `${process.env.FRONTEND_URL}/instructors/subscription/failed`,
        metadata: {
          instructorId: instructorId.toString(),
          customer_email: email,
          amount:199
        },
      });
      res.status(200).json({ success: true, id: session.id ,message:"subscription response"});
    } catch (error) {
      next(error);
    }
  };
};
