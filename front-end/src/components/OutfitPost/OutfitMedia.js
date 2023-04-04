import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import "../../swiper.css";

export default function OutfitMedia(props) {
  const images = props.media.map((media, i) => (
    <SwiperSlide key={i}>
      <img
        className="object-cover aspect-square mx-auto"
        src={media}
        alt="img"
      />
    </SwiperSlide> // show the first photo as preview
  ));
  return (
    <div className="my-2">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        speed={500}
        slidesPerView={1}
        loop
        className="swiper w-screen"
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {images}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
}
