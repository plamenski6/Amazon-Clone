import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/legacy/image";
import { Product } from "../types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { removeFromCart } from "../redux/slices/cartSlice";

import primeImage from "../public/images/prime.png";

type Props = {
    item: Product;
};

const CheckoutProduct = ({ item }: Props) => {
    const dispatch = useDispatch();

    const increaseItemQuantity = () => {
        dispatch(addToCart(item));
    };

    const removeItemFromCart = () => {
        dispatch(removeFromCart(item));
    };

    return (
        <div className="py-5 grid grid-cols-1 md:grid-cols-5 border-b last-of-type:border-0">
            <Image src={item.image} alt={item.title} width={200} height={200} objectFit="contain" />
            <div className="col-span-3 my-2 md:my-0 md:mx-5">
                <p className="mb-2">{item.title}</p>
                <div className="flex mb-3">
                    {Array(Math.round(item.rating.rate))
                        .fill("a")
                        .map((_, index) => (
                            <StarIcon key={index} className="h-4 text-[#FF9900]" />
                        ))}
                </div>
                <p className="text-xs my-2 md:line-clamp-3">{item.description}</p>
                <p className={`${!item.hasPrime ? "mb-2" : ""}`}>
                    $ {(item.price * item.quantity).toFixed(2)} / Qty: {item.quantity}
                </p>
                {item.hasPrime && (
                    <div className="flex items-center">
                        <Image src={primeImage} alt="Prime Logo" width={40} height={40} />
                        <p style={{ marginBottom: 1 }} className="ml-2 text-xs text-gray-500">
                            FREE Next-day Delivery
                        </p>
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-center space-y-3">
                <button className="add-to-cart-button" onClick={increaseItemQuantity}>
                    Add to Cart
                </button>
                <button className="add-to-cart-button" onClick={removeItemFromCart}>
                    Remove from Cart
                </button>
            </div>
        </div>
    );
};

export default CheckoutProduct;
