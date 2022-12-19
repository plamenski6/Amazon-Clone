import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import debugFactory from "debug";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import PageWrapper from "../../components/PageWrapper";
import { Product } from "../../types";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

import primeImage from "../../public/images/prime.png";

const debug = debugFactory("PRODUCT_PAGE");

interface Props {
    product: Product;
}

const ProductPage = ({ product }: Props) => {
    const [hasPrime, setHasPrime] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        setHasPrime(Math.random() < 0.5);
    }, []);

    const addItemToCart = () => {
        const item = { ...product, hasPrime, quantity };
        dispatch(addToCart(item));
    };

    return (
        <>
            <PageWrapper>
                <div className="container mx-auto px-5">
                    <div className="bg-white p-5 lg:p-10">
                        <p className="text-xs italic text-gray-500 capitalize py-2">{product.category}</p>
                        <div className="flex flex-col items-center space-y-5 lg:space-y-0 lg:flex-row lg:justify-between lg:space-x-5">
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={500}
                                height={500}
                                className="object-contain w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]"
                            />
                            <div className="lg:max-w-[500px]">
                                <p className="text-3xl">{product.title}</p>
                                <div className="flex items-center mb-3 mt-1">
                                    {Array(Math.round(product.rating.rate))
                                        .fill("a")
                                        .map((_, index) => (
                                            <StarIcon key={index} className="h-4 text-[#FF9900]" />
                                        ))}
                                    <p>
                                        <span className="mx-2 text-gray-300">|</span>{" "}
                                        <span className="text-xs align-middle text-[#007185]">
                                            From {product.rating.count} ratings
                                        </span>
                                    </p>
                                </div>
                                <p className="text-lg font-semibold border-t border-gray-300 py-3">About this item</p>
                                <p>{product.description}</p>
                                <p className="my-3 text-green-700 font-semibold">In Stock</p>
                                <p className="text-lg font-semibold">$ {product.price.toFixed(2)}</p>
                                <p className="mt-3 text-xs text-gray-500">Add more than one item</p>
                                <div className="flex items-center">
                                    <p className="mr-2">Qty: </p>
                                    <select
                                        className="outline-none py-1 bg-white border rounded shadow-md"
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        defaultValue="1"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                                {hasPrime && (
                                    <div className="flex items-center">
                                        <Image src={primeImage} alt="Prime Logo" width={40} height={40} />
                                        <p className="ml-2 text-xs text-gray-500">FREE Next-day Delivery</p>
                                    </div>
                                )}
                                <div className={`max-w-[300px] ${hasPrime ? "mt-1" : "mt-4"}`}>
                                    <button className="add-to-cart-button" onClick={addItemToCart}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    );
};

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        const products = await res.json();
        let paths: { params: { id: string }; locale: string }[] = [];
        if (locales) {
            products.forEach((product: Product) => {
                for (const locale of locales) {
                    paths.push({
                        params: { id: product.id.toString() },
                        locale,
                    });
                }
            });
        }
        return { paths, fallback: false };
    } catch (err: any) {
        debug(err.message, " in getStaticPaths");
        return { paths: [], fallback: false };
    }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${params && params.id}`);
        const product = await res.json();
        return { props: { product } };
    } catch (err: any) {
        debug(err.message, " in getStaticProps");
        return { props: {} };
    }
};
