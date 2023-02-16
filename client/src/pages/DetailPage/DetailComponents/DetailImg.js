import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { SampleImgSrc, GachiGalleImgSrc } from "../../../sampleImage";

const DetialImg = () => {
    const dummyImage = Object.values(SampleImgSrc);
    const firstPhoto = Math.floor(Math.random() * dummyImage.length);
    const secondPhoto = Math.floor(Math.random() * dummyImage.length);
    const thirdPhoto = Math.floor(Math.random() * dummyImage.length);

    return (
        <div css={Swiper_Wrap}>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={dummyImage[firstPhoto]} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={dummyImage[secondPhoto]} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={dummyImage[thirdPhoto]} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

const Swiper_Wrap = css`
    width: 80vw;
    height: 100%;
    border-radius: 10px;
    margin: 20px auto;
    @media (min-width: 768px) {
        width: 55vw;
        height: 540px;
    }

    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .swiper-slide img {
        display: block;
        border-radius: 10px;
        width: 100%;
        height: 100%;
        /* object-fit: cover; */
    }

    // 버튼
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

export default DetialImg;
