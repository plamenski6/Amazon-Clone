import type { NextApiRequest, NextApiResponse } from "next";
import debugFactory from "debug";
import { Product } from "../../types";
import { Stripe } from "stripe";

const debug = debugFactory("CHECKOUT_SESSION_API");

// Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { items, email } = req.body;

    const line_items = items.map((item: Product) => ({
        quantity: item.quantity,
        price_data: {
            currency: "usd",
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                description: item.description,
                images: [item.image],
            },
        },
    }));

    if (req.method === "POST") {
        try {
            // Create Checkout Sessions from body params.
            const params: Stripe.Checkout.SessionCreateParams = {
                payment_method_types: ["card"],
                shipping_options: [
                    {
                        shipping_rate: "shr_1M2yH6LbwghWgALA3uk1SjMH",
                    },
                ],
                shipping_address_collection: {
                    allowed_countries: ["GB", "BG", "US", "CA"],
                },
                line_items,
                mode: "payment",
                success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/checkout`,
                metadata: {
                    email,
                    items: JSON.stringify(
                        items.map((item: Product) => ({
                            id: item.id,
                            image: item.image,
                        }))
                    ),
                },
            };
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json({ id: session.id });
        } catch (err: any) {
            debug(err.message);
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
