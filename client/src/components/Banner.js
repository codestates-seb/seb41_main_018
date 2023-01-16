/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import 배너이미지1 from "../assets/bannerImg/배너이미지1.png";
import 배너이미지2 from "../assets/bannerImg/배너이미지2.png";
import 배너이미지3 from "../assets/bannerImg/배너이미지3.png";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper/core";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import { PALETTE } from "../Common";

SwiperCore.use([Navigation, Pagination, Autoplay]);
// import "swiper/components/autoplay/autoplay.min.css";
// import "swiper/css/autoplay";

const Banner = () => {
    return (
        <div
            css={css`
                display: flex;
                width: 1080px;
                height: 250px;
                margin: 0 auto;
            `}
        >
            <Swiper
                spaceBetween={50}
                scrollbar={{ draggable: true }}
                navigation
                pagination={{ clickable: true }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                // breakpoints={{
                //     768: {
                //         slidesPerView: 7,
                //     },
                // }}
            >
                <SwiperSlide>
                    <img src={배너이미지1} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={배너이미지2} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={배너이미지3} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={배너이미지1} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
