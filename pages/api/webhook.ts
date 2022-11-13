import type { NextApiRequest, NextApiResponse } from "next";
import debugFactory from "debug";
import { buffer } from "micro";
import * as admin from "firebase-admin";
import serviceAccount from "../../permissions.json";
import { ServiceAccount } from "firebase-admin";
import Stripe from "stripe";

const debug = debugFactory("WEBHOOK_API");

// Secure a connection to Firebase from the backend
const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as ServiceAccount),
      })
    : admin.app();

// Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const fulfillOrder = async (session: Stripe.Checkout.Session) => {
    // console.log("Fulfilling order ", session);
    const email = session?.metadata?.email as string;
    const totalAmount = session.amount_total as number;
    const shippingAmount = session?.total_details?.amount_shipping as number;
    const images = session?.metadata?.images as string;

    return app
        .firestore()
        .collection("users")
        .doc(email)
        .collection("orders")
        .doc(session.id)
        .set({
            amount: totalAmount / 100,
            amount_shipping: shippingAmount / 100,
            images: JSON.parse(images),
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            console.log(
                `Success: Order ${session.id} had been added to the DB`
            );
        })
        .catch((err) => debug(err.message));
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const signature = req.headers["stripe-signature"];

        let event;

        try {
            // Verify that the event came from Stripe
            event = stripe.webhooks.constructEvent(
                payload,
                signature,
                process.env.STRIPE_SIGNIN_SECRET
            ) as Stripe.DiscriminatedEvent;
        } catch (err: any) {
            debug(err.message);
            return res.status(400).send(`Webhook error: ${err.message}`);
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            //Fulfill the order
            return fulfillOrder(session)
                .then(() => {
                    res.status(200);
                })
                .catch((err) => {
                    debug(err.message);
                    res.status(400).send(`Webhook Error: ${err.message}`);
                });
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};
