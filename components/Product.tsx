import { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "../types";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

import primeImage from "../public/images/prime.png";

type Props = {
    product: Product;
};

const ProductComponent = ({ product }: Props) => {
    const [hasPrime, setHasPrime] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setHasPrime(Math.random() < 0.5);
    }, []);

    const addItemToCart = () => {
        const item = { ...product, hasPrime, quantity: 1 };
        dispatch(addToCart(item));
    };

    return (
        <div className="relative bg-white p-4 cursor-pointer z-10">
            <p className="absolute top-1 right-2 italic text-gray-500">{product.category}</p>
            <div className="flex justify-center my-5">
                <Image src={product.image} alt={product.title} width={200} height={200} objectFit="contain" />
            </div>
            <p className="line-clamp-1 mb-2">{product.title}</p>
            <div className="flex mb-3">
                {Array(Math.round(product.rating.rate))
                    .fill("a")
                    .map((_, index) => (
                        <StarIcon key={index} className="h-4 text-[#FF9900]" />
                    ))}
            </div>
            <p className="line-clamp-2 text-xs mb-3">{product.description}</p>
            <p>$ {product.price}</p>
            {hasPrime && (
                <div className="flex items-center">
                    <Image src={primeImage} alt="Prime Logo" width={40} height={40} />
                    <p style={{ marginBottom: 1 }} className="ml-2 text-xs text-gray-500">
                        FREE Next-day Delivery
                    </p>
                </div>
            )}
            <button className={`${!hasPrime ? "mt-10" : ""} add-to-cart-button`} onClick={addItemToCart}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductComponent;
