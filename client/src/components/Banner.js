/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import 배너이미지1 from "../assets/bannerImg/배너이미지1.png";
import 배너이미지2 from "../assets/bannerImg/배너이미지2.png";
import 배너이미지3 from "../assets/bannerImg/배너이미지3.png";
import right from "../assets/right.png";
import left from "../assets/left.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import SwiperCore from "swiper/core";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
// import "swiper/components/navigation/navigation.min.css";
// import "swiper/components/pagination/pagination.min.css";
// import "swiper/css";
// import "swiper/css/bundle";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
import { PALETTE } from "../Common";
// SwiperCore.use([Navigation, Pagination, Autoplay]);

const Banner = () => {
    const swiperOption = {
        spaceBetween: 50,
        scrollbar: {
            draggable: true,
        },
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
    margin: 20px auto; //RegionItems relative로 되어있어서 그 공간을 땡김
    width: 1440px;
    @media (max-width: 1440px) {
        width: 1200px;
    }
    @media (max-width: 1200px) {
        width: 1080px;
    }
    @media (max-width: 1000px) {
        width: 788px;
    }
    @media (max-width: 768px) {
        width: 630px;
    }
    @media (max-width: 576px) {
        width: 460px;
    }
`;
const swiperStyle = css`
    border-radius: ${PALETTE.border_radius};
    .swiper-pagination-bullet {
        margin-top: 40px;
        background: black;
    }
    /* .swiper-button-next {
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
    } */
`;

export default Banner;
