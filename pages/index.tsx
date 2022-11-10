import type { GetServerSideProps } from "next";
import debugFactory from "debug";
import { Carousel } from "react-responsive-carousel";
import Head from "../components/Head";
import { Product } from "../types";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import ProductComponent from "../components/Product";

import bannerGrid from "../public/images/bannerGrid.jpg";
import Image from "next/legacy/image";
import PageWrapper from "../components/PageWrapper";

/* eslint-disable @next/next/no-img-element */

interface Props {
    products: Product[];
}

const debug = debugFactory("HOME_PAGE");

const Home = ({ products }: Props) => {
    return (
        <>
            <Head title="Amazon Clone. Home" description="Home description" page="home" />

            <PageWrapper>
                <div className="relative max-w-screen-2xl mx-auto">
                    <div className="absolute bottom-0 z-5 w-full h-36 bg-gradient-to-t from-[#EAEDED] to-transparent" />
                    <Carousel
                        autoPlay
                        infiniteLoop
                        interval={5000}
                        showIndicators={false}
                        showStatus={false}
                        showThumbs={false}
                    >
                        <div>
                            <img loading="lazy" src="images/banner1.jpg" alt="Banner 1" />
                        </div>
                        <div>
                            <img loading="lazy" src="images/banner2.jpg" alt="Banner 2" />
                        </div>
                        <div>
                            <img loading="lazy" src="images/banner3.jpg" alt="Banner 3" />
                        </div>
                    </Carousel>
                </div>

                <div className="container mx-auto px-5">
                    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 -mt-16 md:-mt-36 lg:-mt-48 xl:-mt-56">
                        {products.slice(0, 4).map((product: Product) => (
                            <ProductComponent key={product.id} product={product} />
                        ))}

                        <div className="flex md:col-span-full">
                            <Image src={bannerGrid} alt="Banner Grid" />
                        </div>

                        <div className="md:col-span-2">
                            {products.slice(4, 5).map((product: Product) => (
                                <ProductComponent key={product.id} product={product} />
                            ))}
                        </div>

                        {products.slice(5).map((product: Product) => (
                            <ProductComponent key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </PageWrapper>
        </>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await unstable_getServerSession(req, res, authOptions);

    let products;
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        products = await response.json();
    } catch (err: any) {
        debug("SERVER ERROR: " + err.message);
    }

    if (products) {
        return {
            props: {
                session,
                products,
            }, // will be passed to the page component as props
        };
    } else {
        res.statusCode = 500;
        throw new Error("Internal Server Error");
    }
};
