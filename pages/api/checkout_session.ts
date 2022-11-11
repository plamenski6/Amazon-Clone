import type { NextApiRequest, NextApiResponse } from "next";
import debugFactory from "debug";
import { Product } from "../../types";

const debug = debugFactory("CHECKOUT_SESSION_API");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { items, email } = req.body;

    const line_items = items.map((item: Product) => ({
        description: item.description,
        quantity: item.quantity,
        price_data: {
            currency: "usd",
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image],
            },
        },
    }));

    if (req.method === "POST") {
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                shipping_address_collection: {
                    allowed_countries: ["GB", "BG", "US", "CA"],
                },
                line_items,
                mode: "payment",
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/checkout`,
                metadata: {
                    email,
                    images: JSON.stringify(items.map((item: Product) => item.image)),
                },
            });
            res.redirect(303, session.url);
        } catch (err: any) {
            debug(err.message);
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
