"use client";

import { Carousel } from "react-responsive-carousel";

/* eslint-disable @next/next/no-img-element */

const CarouselComponent = () => {
    return (
        <Carousel autoPlay infiniteLoop interval={5000} showIndicators={false} showStatus={false} showThumbs={false}>
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
    );
};
export default CarouselComponent;
