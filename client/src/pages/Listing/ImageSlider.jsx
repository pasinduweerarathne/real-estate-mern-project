import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const ImageSlider = ({ images, index }) => {
  SwiperCore.use([Navigation]);
  const imgRef = useRef(null);

  // tracking the image index and scroll down if any
  useEffect(() => {
    if (index) {
      if (imgRef.current) {
        const element = imgRef.current.children[index];
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [index]);

  return (
    <div className="">
      <Swiper navigation loop={true}>
        {images.map((url) => (
          <SwiperSlide key={url}>
            <div
              className="h-[550px]"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "contain",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div ref={imgRef}>
        {images.map((url) => (
          <img key={url} className="mt-4" src={url} alt="" />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
