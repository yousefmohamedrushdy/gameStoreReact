import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "../css/swiper.css";
import GameSlide from "./GameSlide";

function GameSlider({ Games }) {
  const swiperRef = useRef(null);

  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      effect="coverflow"
      grabCursor={true}
      navigation={true}
      loop={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 35,
        stretch: 200,
        depth: 250,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      modules={[EffectCoverflow, Navigation, Autoplay]}
    >
      {Games.slice(0, 10).map((game) => (
        <SwiperSlide key={game._id}>
          <GameSlide game={game} swiperRef={swiperRef} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default GameSlider;
