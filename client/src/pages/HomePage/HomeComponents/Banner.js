import React from "react";

//css
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../../Common";

//UILibrary
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { GachiGalleImgSrc } from "../../../sampleImage";

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
        <div css={Container}>
            <Swiper {...swiperOption} css={SwiperStyle}>
                <SwiperSlide>
                    <img src={GachiGalleImgSrc.banner_1} css={BannerStyle} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={GachiGalleImgSrc.banner_2} css={BannerStyle} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={GachiGalleImgSrc.banner_3} css={BannerStyle} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={GachiGalleImgSrc.banner_1} css={BannerStyle} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

const Container = css`
    display: flex;
    height: 280px;
    margin: 40px auto;
    width: 80vw;
`;
const SwiperStyle = css`
    border-radius: ${PALETTE.border_radius};
    .swiper-pagination-bullet {
        margin-top: 40px;
        background: black;
    }
    .swiper-button-next {
        background: url(${GachiGalleImgSrc.right_button_img}) no-repeat;
        right: 0;
        background-size: 140% auto;
        background-position: center;
        position: absolute;
    }
    .swiper-button-prev {
        background: url(${GachiGalleImgSrc.left_button_img}) no-repeat;
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

const BannerStyle = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default Banner;
