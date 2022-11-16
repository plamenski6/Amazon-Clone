import Head from "../components/Head";
import PageWrapper from "../components/PageWrapper";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import OrderComponent from "../components/Order";
import { Order } from "../types";

interface Props {
    orders: Order[];
}

const Orders = ({ orders }: Props) => {
    const { data: session } = useSession();

    return (
        <div>
            <Head title="Amazon Clone. Orders" description="Orders description" page="orders" />

            <PageWrapper>
                <div className="container mx-auto px-5">
                    <div className="bg-white p-5 lg:p-10">
                        <p className="text-xl sm:text-2xl lg:text-3xl">Your Orders</p>
                        <div className="my-3 border border-yellow-400"></div>
                        {session ? (
                            <p className="text-lg sm:text-xl">
                                {orders.length > 0 ? `${orders.length} orders` : "You have no orders placed"}
                            </p>
                        ) : (
                            <p className="text-lg sm:text-xl">Please sign in to see your orders</p>
                        )}

                        <div className="mt-5 space-y-4">
                            {orders.map((order) => (
                                <OrderComponent key={order.id} order={order} />
                            ))}
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
};

export default Orders;

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale }) => {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const session = await unstable_getServerSession(req, res, authOptions);

    if (session) {
        const usersColRef = collection(db, "users", session?.user?.email as string, "orders");
        const q = query(usersColRef, orderBy("timestamp", "desc"));
        const userOrders = await getDocs(q);

        const orders = await Promise.all(
            userOrders.docs.map(async (doc) => ({
                id: doc.id,
                amount: doc.data().amount,
                shippingAmount: doc.data().amount_shipping,
                fromDB: doc.data().items,
                timestamp: moment(doc.data().timestamp.toDate()).unix(),
                items: (
                    await stripe.checkout.sessions.listLineItems(doc.id, {
                        limit: 100,
                    })
                ).data,
            }))
        );

        return {
            props: {
                session,
                orders,
            },
        };
    } else {
        return {
            redirect: {
                destination: `${locale === "en" ? "/signin" : `/${locale}/signin`}`,
                permanent: false,
            },
        };
    }
};
