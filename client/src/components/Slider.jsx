import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { getStorage, ref, list, getDownloadURL } from "firebase/storage";
import "./slider.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { app } from "../firebase";
import Loading from "./Loading";

const Slider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchFiles = () => {
      const storageRef = getStorage(app);
      const listRef = ref(
        storageRef,
        `gs://mern-real-estate-28553.appspot.com`
      );

      list(listRef, { maxResults: 10 })
        .then((res) => {
          res.items.forEach((itemRef) => {
            getDownloadURL(itemRef).then((url) =>
              setSlides((prev) => [...prev, url])
            );
          });
        })
        .catch((error) => console.log(error));
    };
    fetchFiles();
  }, []);

  return (
    <>
      {slides.length > 0 && slides.length <= 10 ? (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide} className="w-[600px] h-[400px]">
              <img
                src={slide}
                alt="slide_image"
                className="object-cover w-[600px] h-[400px] rounded-3xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Slider;
