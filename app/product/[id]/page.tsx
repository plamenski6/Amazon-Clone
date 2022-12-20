import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import PageWrapper from "../../../components/PageWrapper";
import { Product } from "../../../types";
import ProductClientArea from "./ProductClientArea";

const getData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    const products: Product[] = await res.json();
    return products;
};

export const generateStaticParams = async () => {
    const products = await getData();

    return products.map((product) => ({
        id: product.id.toString(),
    }));
};

const getProduct = async (id: string) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    const product: Product = await res.json();
    return product;
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
    const product = await getProduct(params.id);

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
                                <ProductClientArea product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    );
};

export default ProductPage;
