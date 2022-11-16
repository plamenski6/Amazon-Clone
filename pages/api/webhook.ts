import type { NextApiRequest, NextApiResponse } from "next";
import debugFactory from "debug";
import { buffer } from "micro";
import Stripe from "stripe";
import { db } from "../../firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const debug = debugFactory("WEBHOOK_API");

// Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const signature = req.headers["stripe-signature"];

        let event: Stripe.Event;

        try {
            // Verify that the event came from Stripe
            event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_SIGNIN_SECRET);
        } catch (err: any) {
            debug(err.message);
            return res.status(400).send(`Webhook error: ${err.message}`);
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const email = session?.metadata?.email as string;
            const totalAmount = session.amount_total as number;
            const shippingAmount = session?.total_details?.amount_shipping as number;
            const items = session?.metadata?.items as string;

            await setDoc(doc(db, "users", email, "orders", session.id), {
                amount: totalAmount / 100,
                amount_shipping: shippingAmount / 100,
                items: JSON.parse(items),
                timestamp: serverTimestamp(),
            })
                .then(() => {
                    console.log(`Success: Order ${session.id} had been added to the DB`);
                })
                .catch((err: any) => debug(err.message));
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};
