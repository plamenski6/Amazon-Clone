"use client";

import PageWrapper from "../../components/PageWrapper";
import Image from "next/image";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import debugFactory from "debug";

import checkoutBanner from "../../public/images/checkoutBanner.png";
import CheckoutProduct from "../../components/CheckoutProduct";

const debug = debugFactory("CHECKOUT_PAGE");

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const Checkout = () => {
    const { data: session } = useSession();

    const items = useSelector((state: RootState) => state.cart.items);
    const total = useSelector((state: RootState) =>
        state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
    );

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        try {
            const response = await fetch("/api/checkout_session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items,
                    email: session?.user?.email,
                }),
            });

            const result = await response.json();

            if (!result.id) alert(result);

            await stripe?.redirectToCheckout({
                sessionId: result.id,
            });
        } catch (err: any) {
            debug(err.message);
        }
    };

    return (
        <>
            <PageWrapper>
                <div className="container space-y-5 lg:flex lg:space-y-0 lg:space-x-5 mx-auto px-5">
                    <div className="w-full">
                        <Image src={checkoutBanner} alt="Checkout Banner" width={1025} height={250} />

                        <div className="bg-white mt-3 p-6">
                            <p className={`${items.length > 0 ? "border-b pb-5" : ""} text-xl md:text-3xl`}>
                                {items.length > 0 ? "Shopping Cart" : "Your Amazon Cart is empty."}
                            </p>

                            {items.map((item) => (
                                <CheckoutProduct key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                    {items.length > 0 && (
                        <div className="flex flex-col bg-white p-10 min-w-[260px]">
                            <p>
                                Subtotal ({items.length} {items.length > 1 ? "items" : "item"}):{" "}
                                <span className="font-bold">${total.toFixed(2)}</span>
                            </p>

                            <button
                                role="link"
                                onClick={createCheckoutSession}
                                disabled={!session}
                                className={`add-to-cart-button mt-2 ${
                                    !session
                                        ? "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed active:from-gray-300 active:to-gray-500"
                                        : ""
                                }`}
                            >
                                {!session ? "Sign in to checkout" : "Proceed to checkout"}
                            </button>
                        </div>
                    )}
                </div>
            </PageWrapper>
        </>
    );
};

export default Checkout;
