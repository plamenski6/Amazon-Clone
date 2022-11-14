import { useEffect, useState } from "react";
import Head from "../components/Head";
import PageWrapper from "../components/PageWrapper";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Oval } from "react-loader-spinner";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Success = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCart());
        setIsLoading(false);
    }, [dispatch]);

    return (
        <>
            <Head title="Amazon Clone. Success" description="Success description" page="success" />

            <PageWrapper>
                {!isLoading ? (
                    <div className="container mx-auto px-5">
                        <div className="bg-white max-w-3xl mx-auto p-5 lg:p-10">
                            <div className="mb-5 flex items-center">
                                <CheckCircleIcon className="h-10 mr-3 text-green-500" />{" "}
                                <p className="text-xl sm:text-2xl lg:text-3xl">Your order has been confirmed!</p>
                            </div>
                            <p>
                                Thank you for shopping with us. We&apos;ll send a confirmation email once your items has
                                shipped!
                            </p>
                            <p className="mb-5">
                                If you would like to check the status of your order(s) please press the button below.
                            </p>
                            <Link href="/orders">
                                <button className="add-to-cart-button">Go to my orders</button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="h-screen flex justify-center items-center">
                        <Oval
                            height={80}
                            width={80}
                            color="#131921"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="oval-loading"
                            secondaryColor="#131921"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                        />
                    </div>
                )}
            </PageWrapper>
        </>
    );
};

export default Success;

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale }) => {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: `${locale === "en" ? "/" : `/${locale}`}`,
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};
