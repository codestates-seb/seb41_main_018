import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import HomeItems from "../components/Home_components/HomeItems";
import Regionitems from "../components/Home_components/RegionItems";
import Categorybar from "../components/Categorybar";
import Banner from "../components/Home_components/Banner";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import right from "../assets/right.png";
import left from "../assets/left.png";
import { getContent } from "../util/axiosDetail";
import { useRecoilState } from "recoil";
import { ContentsList, loginState } from "../state/atom";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Home = () => {
    const [contentsList, setcontentsList] = useRecoilState(ContentsList);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getContent().then((res) => {
            setIsLoading(false);
            setcontentsList(res.data.data);
        });
    }, []);

    const swiperOption = {
        spaceBetween: 10,
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
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
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
                    <Banner />
                    <div css={itemsTitle}>✈️ 관심 급상승 여행지</div>
                    <Swiper {...swiperOption} css={postStyle}>
                        <div>
                            {contentsList &&
                                contentsList.map((content) => (
                                    <SwiperSlide key={content.contentId}>
                                        <HomeItems content={content} />
                                    </SwiperSlide>
                                ))}
                        </div>
                    </Swiper>
                    <div css={itemsTitle}>✈️ 관심 급상승 여행지</div>
                    <Swiper {...swiperOption} css={postStyle}>
                        <div>
                            <SwiperSlide>
                                <HomeItems />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItems />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItems />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItems />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItems />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItems />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItems />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItems />
                            </SwiperSlide>
                        </div>
                    </Swiper>
                    <Banner />
                    <Footer />
                </>
            )}
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
