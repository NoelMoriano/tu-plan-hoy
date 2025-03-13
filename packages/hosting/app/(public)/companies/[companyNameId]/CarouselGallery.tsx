"use client";
import React from "react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

const images = [
  "/images/c-img-1.jpg",
  "/images/c-img-2.jpg",
  "/images/c-img-3.jpg",
  "/images/c-img-4.jpg",
  "/images/c-img-1.jpg",
  "/images/c-img-2.jpg",
  "/images/c-img-3.jpg",
  "/images/c-img-4.jpg",
];

export const CarouselGallery = () => {
  return (
    <div className="w-full max-w-[25em] md:max-w-[40em] mx-auto flex justify-center overflow-hidden">
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        slidesPerView={4}
        spaceBetween={23}
        navigation
        virtual
      >
        {images.map((image, index) => (
          <SwiperSlide key={image} virtualIndex={index}>
            <Image
              src={image}
              width={356}
              height={356}
              alt="galeria"
              className="object-contain rounded-[5px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
