"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";
import { Product } from "../../../types";
import Image from "next/image";

import primeImage from "../../../public/images/prime.png";

const ProductClientArea = ({ product }: { product: Product }) => {
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
        </>
    );
};

export default ProductClientArea;
