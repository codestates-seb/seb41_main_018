/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Postitems from "../components/Postitems";
import Regionitems from "../components/RegionItems";
import Categorybar from "../components/Categorybar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper/core";
/* import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css"; */
import right from "../assets/right.png";
import left from "../assets/left.png";

const Home = () => {
    const swiperOption = {
        spaceBetween: 10,
        // scrollbar: {
        //     draggable: true,
        // },
        slidesPerView: 5,
        navigation: true,
        breakpoints: {
            1441: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
            1000: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            400: {
                slidesPerView: 1,
            },
        },
    };
    return (
        <div>
            <Categorybar />
            <Swiper {...swiperOption} css={postStyle}>
                <div>
                    <SwiperSlide>
                        <Regionitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Regionitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Regionitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Regionitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Regionitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Regionitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Regionitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Regionitems />
                    </SwiperSlide>
                </div>
            </Swiper>
            {/* <Banner /> */}
            <div css={itemsTitle}>✈️ 관심 급상승 여행지</div>
            <Swiper {...swiperOption} css={postStyle}>
                <div>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                </div>
            </Swiper>
            <div css={itemsTitle}>✈️ 관심 급상승 여행지</div>
            <Swiper {...swiperOption} css={postStyle}>
                <div>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Postitems />
                    </SwiperSlide>
                </div>
            </Swiper>
            <Banner />
            <Footer />
        </div>
    );
};

const itemsTitle = css`
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
    margin: 30px auto 0;
    font-size: 1.5rem;
    font-weight: 600;
`;

const postStyle = css`
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

export default Home;
