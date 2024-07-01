import { IDependencies } from "@/application/interfaces/IDependencies";
import { Subscription } from "@/infrastructure/database/models/Subscription";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import { createChatProducer} from "@/infrastructure/messages/kafka/producer"

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2024-04-10",
});
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET as string;

export const subscriptionWebhook = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const stripeSignature = req.headers["stripe-signature"];
    if (stripeSignature == null) {
      throw new Error("No stripe signature found!");
    }
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        stripeSignature?.toString(),
        endpointSecret
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${(err as Error).message}`);
      return;
    }
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        const userId = checkoutSession.metadata?.customer_email as string;
        const instructorId = checkoutSession.metadata?.instructorId as string;
        const subscriptionId = checkoutSession.id;
        const status = checkoutSession.payment_status;
        const amount = checkoutSession.metadata?.amount;

        const timestamp = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000);
        const currentPeriodEnd = new Date(timestamp);
        const newSubscription = new Subscription({
          userId,
          instructorId,
          subscriptionId,
          status,
          currentPeriodEnd,
          amount,
        });

        try {
          await newSubscription.save();
          await createChatProducer({type:'individual',participants:[userId,instructorId]})
        } catch (saveError) {
          console.error("Error saving subscription:", saveError);
          return res.status(500).send("Internal Server Error");
        }

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.json({ received: true });
  };
};
