import { GetServerSideProps } from "next";
import Head from "../components/Head";
import PageWrapper from "../components/PageWrapper";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Image from "next/legacy/image";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";

import checkoutBanner from "../public/images/checkoutBanner.png";
import CheckoutProduct from "../components/CheckoutProduct";

const Checkout = () => {
    const items = useSelector((state: RootState) => state.cart.items);

    return (
        <>
            <Head title="Amazon Clone. Checkout" description="Checkout description" page="checkout" />

            <PageWrapper>
                <div className="container flex mx-auto px-5">
                    <div>
                        <Image src={checkoutBanner} alt="Checkout Banner" width={1025} height={250} />

                        <div className="bg-white mt-3 p-6">
                            <p className="text-xl md:text-3xl border-b pb-5">
                                {items.length > 0 ? "Shopping Cart" : "Your Amazon Cart is empty."}
                            </p>

                            {items.map((item) => (
                                <CheckoutProduct key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    );
};

export default Checkout;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await unstable_getServerSession(req, res, authOptions);

    return {
        props: {
            session,
        },
    };
};
