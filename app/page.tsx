import Image from "next/image";
import PageWrapper from "../components/PageWrapper";
import ProductComponent from "../components/Product";
import CarouselComponent from "../components/Carousel";
import { Product } from "../types";

import bannerGrid from "../public/images/bannerGrid.jpg";

const getData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    const products: Product[] = await res.json();
    return products;
};

const Home = async () => {
    const products = await getData();

    return (
        <PageWrapper>
            <div className="relative max-w-screen-2xl mx-auto">
                <div className="absolute bottom-0 z-5 w-full h-36 bg-gradient-to-t from-[#EAEDED] to-transparent" />
                <CarouselComponent />
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
    );
};

export default Home;
