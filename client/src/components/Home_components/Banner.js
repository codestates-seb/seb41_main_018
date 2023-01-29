/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";
import 배너이미지1 from "../../assets/bannerImg/배너이미지1.png";
import 배너이미지2 from "../../assets/bannerImg/배너이미지2.png";
import 배너이미지3 from "../../assets/bannerImg/배너이미지3.png";
import right from "../../assets/right.png";
import left from "../../assets/left.png";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

SwiperCore.use([Navigation, Pagination, Autoplay]);
const Banner = () => {
    const swiperOption = {
        spaceBetween: 50,
        navigation: true,
        pagination: {
            clickable: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    };
    return (
        <div css={wrap}>
            <Swiper {...swiperOption} css={swiperStyle}>
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

const wrap = css`
    display: flex;
    height: 300px;
    margin: 20px auto;
    width: 80vw;
`;
const swiperStyle = css`
    border-radius: ${PALETTE.border_radius};
    .swiper-pagination-bullet {
        margin-top: 40px;
        background: black;
    }
    .swiper-button-next {
        background: url(${right}) no-repeat;
        right: 0;
        background-size: 140% auto;
        background-position: center;
        position: absolute;
    }
    .swiper-button-prev {
        background: url(${left}) no-repeat;
        left: 0;
        background-size: 140% auto;
        background-position: center;
        position: absolute;
    }
    .swiper-button-next::after,
    .swiper-button-prev::after {
        display: none;
    }
`;

export default Banner;
